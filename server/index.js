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

app.get("/", (req, res) => {
  res.send("Server deployed successfully!");
});

app.use(morgan("dev"));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/user", userRouter);
app.use("/xplore", xploreRoute);
app.use("/profile", profileRoute);


const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server started successfully on http://localhost:${PORT}/`);
    });
  })
  .catch((error) => {
    console.log(`Unable to connect, ${error}`);
  });
