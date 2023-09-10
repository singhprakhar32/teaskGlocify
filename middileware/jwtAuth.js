const JWT = require('jsonwebtoken');
const jwtAuth = (req,res,next)=>{
    const token = (req.cookies && req.cookies.token)||null;
    try {
        const payload = JWT.verify(token,process.env.SECRET);
        console.log(payload);
        req.user = {id:payload.id,email:payload.email,userType:payload.userType};

    } catch (error) {
        return res.status(400).json({
            success: false,
            message:error.message
        })
    }



    next();
}
module.exports = jwtAuth;