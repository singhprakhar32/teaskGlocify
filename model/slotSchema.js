const mongoose = require('mongoose');
const {Schema} = mongoose;

const slotSchema = new Schema({
    slot:{
        type:String,
        required:true,
    },
    booked:{
        type:Boolean,
        required:true,
    },
    bookedBy:{
        type:Schema.Types.ObjectId,
        ref:"user"
    }
},{
    timestamps:true
});

const slotModel = mongoose.model("slots",slotSchema);
module.exports = slotModel;