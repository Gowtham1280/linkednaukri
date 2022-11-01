const express=require('express')
const Source=require('../models/sources')
const sourceRouter=express.Router()
const auth=require('../middleware/auth')

sourceRouter.post('/source',auth, async (req,res)=>{
    const source= new Source({
        ...req.body,
        owner:req.user.id
    })
    try{
        await source.save()
        console.log("sourcepost ",source)
        res.status(200).send(source)
    }catch(e){
        res.status(400).send()
    }
})

sourceRouter.get('/source',auth, async (req,res)=>{
    try{
        // const source=await Source.find({owner:req.user.id})
        await req.user.populate({
            path:'mysources',
            match:{
                description:'naukri'
            },
            options:{
                sort:{
                    createdAt:1
                }
            }
        
        }).execPopulate()
        res.status(200).send(req.user.mysources)
        console.log("source find ", req.user.mysources)
    }catch(e){
        res.status(404).send(e)
    }
})

sourceRouter.get('/source/:id',auth, async (req,res)=>{
    const _id=req.params.id
    try{
        // const source=await Source.findById(_id)  // findById wont let us limit by multiple fields hence we use findOne
        const source=await Source.findOne({_id, owner:req.user._id}) // since here not like above just e=req.user.id here it could be just id or many fields like (_id, owner:req.user._id)
        if(!source){
            return res.status(404).send()
        }
        res.send(source)
        console.log("source findByOne ", source)
    }catch(e){
        res.status(404).send(e)
    }
})

sourceRouter.patch('/source/:id',auth,async (req,res)=>{
    const valid=Object.keys(req.body)
    const validUpdates=['description','role','age']
    const validatingKeys=valid.every(key=>validUpdates.includes(key))
    if(!validatingKeys){
        return res.status(404).send("invalid updates")
    }
    try{
        const sourcePatch=await Source.findOne({_id:req.params.id,owner:req.user._id})
        if(!sourcePatch){
            return res.status(404).send()
        }
        valid.forEach(update=>{
            sourcePatch[update]=req.body[update]
        })
        // const source=await Source.findByIdAndUpdate(_id,req.body,{new:true,runValidators:true})
        await sourcePatch.save()
        console.log("patchsrcID ", sourcePatch)
        res.status(200).send(sourcePatch)
    }catch(e){
        console.log(e)
        res.status(404).send(e)
    }
})

sourceRouter.delete('/source/:id',auth, async (req,res)=>{
    try{
        // const source=await Source.findByIdAndDelete(req.params.id)
        const source=await Source.findOneAndDelete({_id:req.params.id, owner:req.user._id})
        if(!source){
            return res.status(404).send()
        }
        res.status(200).send(source)
    }catch(e){
        res.status(500).send(e)
    }
})

module.exports=sourceRouter