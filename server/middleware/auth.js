const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');

dotenv.config();


const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    let decodedData = jwt.verify(token, process.env.SECRET_KEY);
    req.userId = decodedData?.id;
    next();
  } catch (err) {
    console.log(err);
  }
};

module.exports = auth;
