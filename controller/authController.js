const userModel = require('../model/userSchema');
const emailValidator = require("email-validator");
const bcrypt = require("bcrypt");
const signUp = async(req,res,next) => {  
    const {name,email,password,confirmPassword,userType} = req.body;
    if(!name ||!email ||!password) 
    {
        return res.status(400).json({
            success: false,
            message:"Every Field is required"
        })
    }
    const validEmail = emailValidator.validate(email);
    if(!validEmail)
    {
        return res.status(400).json({
            success: false,
            message:"Please Provide valid email address"
        })
    }
    if(password !== confirmPassword)
    {   
        return res.status(400).json({
            success: false,
            message:"Password and Confirm Password must be same"
        })
    }

    try {
            const userInfo = userModel(req.body);
            const result = await userInfo.save();
            return res.status(200).json({
                Success:true,
                data:result
            })
        } catch (error) {
            if(error.code ===11000){
                return res.status(400).json({
                    success:false,
                    message:"Account already exists with this email address"
                });
            }
            return res.status(400).json({
                success:false,
                message:error.message
            })
    }
}
const signIn = async(req,res)=> {
        const {email,password} = req.body;
        console.log(email,"password",password);
        if(!email || !password)
        {
            return res.status(400).json({   
                success:false,
                message:"Every Field is mandatory"
            })
        }
        try {
            const user = await userModel
            .findOne({
                email
            })
            .select('+password')
       
            if(!user || !(await bcrypt.compare(password,user.password))){
                return res.status(400).json({
                    success:false,
                    message:"Invalid Credentails"
                })
            }
            const token = user.jwtToken();
            user.password =undefined;
            
            const cookieOptions = {
                maxAge:24*60*60*1000,
                httpOnly:true, 
            }
            res.cookie("token",token,cookieOptions) 
            res.status(200).json({success:true,data:user})
        } catch (error) {
            res.status(400).json({success:false,message:error.message})
        }
      
    }
const getUser = async(req, res) =>{
    const userId = req.user.id;
    try {
            const user = await userModel.findById(userId);
            return res.status(200).json({success:true,data:user})
    } catch (error) {
        return res.status(400).json({success:false,message:error.message})
    } 
}
const logout = async(req, res) =>{
    try {
            const cookieOption ={
                expires:new Date(),
                httpOnly:true,
            }
            res.cookie("token",null,cookieOption)
            res.status(200).json({
                success:true,
                message:"logout successfully"
            })

    } catch (error) {
       return res.status(400).json({
            success:true,
            message:error.message,
        })

    }
}
module.exports={
    signUp,
    signIn,
    getUser,
    logout
}