const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');

dotenv.config();

const User = require("../models/user");
const Profile = require("../models/profile");


const createUser = async (req, res) => {
  const { email, password, firstName, lastName, username } = req.body;
  try {
    const existingUser = await User.findOne({ email: email });
    const existingUserName = await User.findOne({ username: username });
    if (existingUser) {
      return res.status(400).json({ message: "user already exists!" });
    }
    if (existingUserName) {
      return res.status(400).json({ message: "username already exists!" });
    }
    if (username.includes(" ")) {
      return res
        .status(400)
        .json({ message: "Please do not include spaces in username!" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
      name: `${firstName} ${lastName}`,
      email: email,
      username: username,
      password: hashedPassword,
    });

    user.save((err) => {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .json({ message: "Oops! Something went wrong", err });
      } else {
        const token = jwt.sign(
          { email: user.email, id: user._id },
          SECRET_KEY,
          { expiresIn: "1h" }
        );

        const profile = new Profile({
          userId: user._id,
          name: `${firstName} ${lastName}`,
          username: username,
        });
        profile.save((error) => {
          if (error) {
            console.log(error);
            return res
              .status(500)
              .json({ message: "Oops! Something went wrong", err });
          }
        });

        res
          .status(201)
          .json({ message: "user created successfully", user, profile, token });
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Oops! Something went wrong", err });
    console.log(err);
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username: username });
    if (!existingUser) {
      return res.status(404).json({ message: "User not found!" });
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );
    const profile = await Profile.findOne({ userId: `${existingUser._id}` });
    res.status(200).json({ user: existingUser, token, profile });
  } catch (err) {
    res.status(500).json({ message: "Oops! Something went wrong" });
    console.log(err);
  }
};

const updatePassword = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    let user = await User.findOne({ email: email });
    const hashedPassword = await bcrypt.hash(password, 12);
    user = await User.findByIdAndUpdate(
      user._id,
      { password: hashedPassword },
      { new: true }
    );
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = { createUser, loginUser, updatePassword };
