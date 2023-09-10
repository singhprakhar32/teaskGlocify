const express = require('express');
const app = express();
const databaseConnection = require('./config/databaseConfig');
const cookieParser = require("cookie-parser");
const authRouter = require("./router/authRoutes");
const slotRouter = require("./router/slotRoutes");
databaseConnection()
app.use(express.json())
app.use(cookieParser());
app.use("/api/auth/",authRouter)
app.use("/api/slots",slotRouter)
app.use('/',(req,res)=>{
    res.status(200).json({data:"JWTauth server"})
})

module.exports = app;