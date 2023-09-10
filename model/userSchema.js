require('dotenv').config()
const mongoose = require('mongoose');
const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {Schema} = mongoose;

const userSchema = new Schema({
    name:{
        type:String,
        required:[true,'user name is required'],
        minLength:[5,'Name must be atleast 5 characters'],
        maxLength:[50,'Name must be less then 50 characters'],
        trim :true,
    },
    email:{         //We can user here University number also but university number is not unique so that's why i take email so this will be a unique
        type:String,
        required:[true,'user email is required'],
        unique:true,
        lowercase:true,
        unique:[true,"User already registered"]
    },
    password:{
        type:String,
        select:false,
    },
    userType:{      //type:1=>Dean, 0=>Student
        type:Number
    }
},{
    timestamps:true
});

userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        return next();
    }
    this.password = await bcrypt.hash(this.password,10);
    return next();
})

userSchema.methods = {
    jwtToken(){
        return JWT.sign({id:this._id, email:this.email, userType:this.userType},process.env.SECRET,{expiresIn:'24h'})
    }
}
const userModel = mongoose.model("user",userSchema);
module.exports = userModel;