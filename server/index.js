const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const userRouter = require("./routes/user");
const xploreRoute = require("./routes/xplore");
const profileRoute = require("./routes/profile");
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(morgan("dev"));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(cors());

app.get("/", (req,res) => {
    res.send("Deploy successful.")
})

app.use("/user", userRouter);
app.use("/xplore", xploreRoute);
app.use("/profile", profileRoute);


mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log(`server started successfully on http://localhost:${process.env.PORT || 5000}/`);
    });
  })
  .catch((error) => {
    console.log(`Unable to connect, ${error}`);
  });
