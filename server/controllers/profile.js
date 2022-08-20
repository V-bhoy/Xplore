const XPlore = require("../models/xplore");
const Profile = require("../models/profile");
const mongoose = require("mongoose");

const updateProfile = async (req, res) => {
  const { profileUrl, bio, website } = req.body;
  const { userId } = req.params;
  try {
    const profile = await Profile.findOneAndUpdate(
      { userId: userId },
      { profileUrl, bio, website },
      { new: true }
    );
    console.log(profile);
    res.status(200).json({ message: "Profile updated successfully", profile });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong!" });
  }
};

const getFav = async (req, res) => {
  try {
    const user = await Profile.findOne({ userId: req.userId });
    const { favourites } = user;
    console.log(favourites);
    const favs = await XPlore.find({ _id: { $in: favourites } });
    res.status(200).json(favs);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong!" });
  }
};

const updateFav = async (req, res) => {
  const { id } = req.params;
  try {
    if (!req.userId) {
      return res.json({ message: "User is not authenticated" });
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "xplore not found" });
    }
    const profile = await Profile.findOne({ userId: req.userId });
    if (!profile.favourites.includes(id)) {
      profile.favourites.push(id);
    } else {
      profile.favourites = profile.favourites.filter((elem) => elem !== id);
    }
    const updated = await Profile.findOneAndUpdate(
      { userId: req.userId },
      profile,
      { new: true }
    );
    res.status(200).json({ message: "Added to your favourites!", updated });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong!" });
  }
};

module.exports = { updateProfile, updateFav, getFav };
