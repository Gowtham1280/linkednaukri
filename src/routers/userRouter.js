const express=require('express')
const User=require('../models/users')
const userRouter=express.Router()
const jwt=require('jsonwebtoken')
const auth=require('../middleware/auth')

userRouter.post('/user',async (req,res)=>{
    const user=new User(req.body)
    try{
        await user.save()
        const token=await user.generatingToken()
        // console.log(user)
        res.status(200).send({user,token})
    }catch(e){
        res.status(400).send(e.keyValue.email +" already exsists")   // e.keyValue.email presnt on e(error)
    }
})

userRouter.post('/user/login',async (req,res)=>{
    try{
        const userlogin=await User.findByCredentails(req.body.email, req.body.password)
        const token=await userlogin.generatingToken()
        console.log("ed ",token)
        res.send({userlogin,token}) //removed this userlogin:userlogin.getpublicProfile() and written JSON => when we pass an object to  res.send() behind the scenes itis caliing JSON.strinfgy() since when we setup JSON it is going to get called whenever that object gets stringify

    }catch(e){
        console.log(e)
        res.status(400).send({'error':'Invalid login username/password is incorrect'})
    }
       
})

userRouter.post('/user/logout',auth,async (req,res)=>{
    try{
        req.user.tokens=req.user.tokens.filter((tokens)=>{
            return tokens.token!==req.token
        })
        await req.user.save()
        res.send(req.user)
    }catch(e){
        res.status(500).send()
    }
})

userRouter.post('/users/logoutAll',auth,async(req,res)=>{
    try{
        req.user.tokens=[]
        await req.user.save()
        res.send("logged out of all devices")
    }catch(e){
        res.status(200).send()
    }
})

userRouter.get('/user/me',auth,async (req,res)=>{
    res.send(req.user)
})

userRouter.delete('/user', async(req,res)=>{
    try{
        const remove=await User.deleteOne({"email": "asdrff@gmail.com"})
        res.status(200).send(remove)
    }catch(e){
        res.status(404).send()
    }
        
})

userRouter.delete('/user/me',auth, async(req,res)=>{
    try{
        await req.user.remove()
        res.status(200).send(req.user)
    }catch(e){
        res.status(500).send()
    }
        
})

userRouter.patch('/user/me',auth,async (req,res)=>{
    const valid=Object.keys(req.body)
    const validUpdates=['name','email','updated']
    const validatingKeys=valid.every(key=>validUpdates.includes(key))
    if(!validatingKeys){
        return res.status(404).send("invlaid updates")
    }
    try{
        const userpatch=req.user
        valid.forEach(update=>{
            userpatch[update]=req.body[update]
        })
        await userpatch.save()
        // const jobpatch=await Job.findByIdAndUpdate(_id,req.body,{new:true,runValidators:true})
        res.status(200).send(userpatch)
    }catch(e){
        console.log(e)
        res.status(404).send()
    }
})

module.exports=userRouter