const jwt=require('jsonwebtoken')
const User=require('../models/users')

const auth=async (req,res,next)=>{
    try{
        const token=req.header('Authorization').replace('Bearer ','')
        const decode=jwt.verify(token,'sometext')
        console.log("token,deoced  ",token,decode)
        const user=await User.findOne({_id:decode._id})
        console.log("usruth ",user)
        if(!user){
            throw new Error()
        }
        req.user=user
        req.token=token
        next()
    }catch(e){
        res.send({'error':'invalid authentication'})
    }
}

module.exports=auth