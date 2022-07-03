const {Router} = require('express');
const {createUser,loginUser,updatePassword} = require("../controllers/user");


const userRouter = Router();

userRouter.post("/signup",createUser);
userRouter.post("/login",loginUser);
userRouter.patch("/editPassword",updatePassword);


module.exports = userRouter;