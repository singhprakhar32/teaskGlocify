const slotModel = require('../model/slotSchema')
const mongoose = require('mongoose');
const createSlot = async(req,res)=>{
    const{slot,booked} = req.body
    try {
            const slotInfo = slotModel(req.body)
            const result =await slotInfo
            .save();
            return res
            .status(200)
            .json({
                Success:true,
                data:result
            })
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:error.message
        })
    }
}
const getDetailsOfSlots = async(req,res)=>{
    try {
            const slotDetails = await slotModel.find()
            return res.status(200)
            .json({
                Success:true,
                data: slotDetails
            })
    } catch (error) {
        return res
        .status(400)
        .json({
            success:false,
            message:error.message
        })
    }
}
const slotBookByStudents= async(req,res) =>{
    try {
        const {slot} = req.body;
        const slotId = new mongoose.Types.ObjectId(slot);
            if(req.user.userType !== 0)
            {
                return res
                .status(400)
                .json({
                    success:false,
                    message:"only Students is alloed to book the slots"
                })
            }
        const isExistingSlot = await slotModel.findById(slotId)
        if(isExistingSlot && isExistingSlot.booked == false) 
        {
            const slotBookByStudent = await slotModel
            .updateOne({_id:slotId},{bookedBy: new mongoose.Types.ObjectId(req.user.id),booked:true})
            if (slotBookByStudent. modifiedCount>0) {
                return res
                .status(200)
                .json({
                    success:true,
                    message:"Slot booked successfully"
                });
            } else {
                return res.status(400).json({
                    success:false,
                    message:"Failed to book the slot"
                });
            }
        }   
        
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"Failed to book the slot"
        });
    }
}
const studentSlotsDetails = async(req,res)=>{
    try {
            if(req.user.userType !== 1)
            {
                return res
                .status(400)
                .json({success:false, message:"Only Dean can access this resource."})
            }
            const studentSlotsDetails = await slotModel.aggregate([
                {
                  $lookup: {
                    from: "users",
                    localField: "bookedBy",
                    foreignField: "_id",
                    as: "bookedByDetails",
                  },
                },
                {
                  $unwind: "$bookedByDetails",
                },
                {
                  $project: {
                    slot: 1,
                    booked: 1,
                    bookedByDetails: {
                      name: 1,
                      email: 1,
                    },
                  },
                },
              ]);
              return res
              .status(200)
              .json({success:true, data:studentSlotsDetails})
    } catch (error) {
        return res
        .status(400)
        .json({success:false, message:error.message})
    }
}
module.exports = {createSlot,getDetailsOfSlots,slotBookByStudents,studentSlotsDetails}