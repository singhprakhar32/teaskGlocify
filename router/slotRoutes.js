const express = require("express");
const slotRouter = express.Router();
const {createSlot,getDetailsOfSlots,slotBookByStudents,studentSlotsDetails} = require("../controller/slotController")
const JWTauth = require("../middileware/jwtAuth")

slotRouter.post("/createFreeSlots",JWTauth,createSlot);
slotRouter.get("/getDetailsOfSlots",JWTauth,getDetailsOfSlots);
slotRouter.post("/slotBookByStudent",JWTauth,slotBookByStudents);
slotRouter.get("/studentSlotsDetails",JWTauth,studentSlotsDetails)
module.exports =slotRouter;