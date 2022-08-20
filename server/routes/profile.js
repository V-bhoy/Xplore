const { Router } = require("express");
const { updateProfile, updateFav, getFav } = require("../controllers/profile");
const auth = require("../middleware/auth");

const profileRouter = Router();

profileRouter.get("/fav", auth, getFav);
profileRouter.post("/edit/:userId", auth, updateProfile);
profileRouter.patch("/fav/:id", auth, updateFav);

module.exports = profileRouter;
