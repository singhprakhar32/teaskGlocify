const express = require("express");
const { signUp,signIn,getUser,logout } = require("../controller/authController");
const JWTauth = require("../middileware/jwtAuth")
const authRouter = express.Router();
authRouter.post("/signup",signUp)
authRouter.post("/signIn",signIn)
authRouter.get("/user",JWTauth,getUser)
authRouter.get("/logout",JWTauth,logout)
module.exports = authRouter