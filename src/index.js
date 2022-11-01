require('./db/mongoose')
const express=require("express")
const User =require('./models/users')
const source=require('./models/sources')
const userRouter=require('./routers/userRouter')
const sourceRouter=require('./routers/sourceRouter')
const port=process.env.PORT||3000
const app=express()
app.use(express.json())

app.use(userRouter)
app.use(sourceRouter)

app.listen(port,()=>{
    console.log("server is up on port "+ port)
})


const bcrypt=require('bcryptjs')

// written using promises
// const myfunc1=()=>{
//     const pwd1='Gowth@m1280'
//     bcrypt.hash(pwd1,8).then((hpd)=>{
//         console.log(hpd)
//     }).catch((e)=>{
//         console.log(e)
//     })
// }

// written using async await
const myfunc=async ()=>{
    const pwd='Gowth@m1280'
    const hashedpwd=await bcrypt.hash(pwd,8)
    console.log(pwd,hashedpwd)

    const validating=await bcrypt.compare(pwd,hashedpwd)
    console.log(validating)
}

myfunc()


const jwt=require('jsonwebtoken')

const main=async ()=>{
  const token=jwt.sign({id:'abcd'},'sometext')
  console.log("token ",token)

  const decode=jwt.verify(token,'sometext')
  console.log(decode) 
  console.log(decode.id) // only id part if we want to grab 
}

main()


// const main2=async ()=>{
  // const task=await source.findById('628f46d3b3be1532d49f49b2')
  // await task.populate('owner').execPopulate()   
  // console.log("source ",task.owner)      
//   const user=await User.findById('6291db9877a7072c08919843')
//   await user.populate('mysources').execPopulate()
//   console.log(user)
// }

// main2()




















// app.post('/job',(req,res)=>{
//     const job=new Job(req.body)
//     job.save().then(()=>{
//         console.log(job)
//         res.status(200).send(job)
//     }).catch((e)=>{
//         console.log("error",e)
//         res.status(400).send()
//     })
// })

// app.get('/job',async (req,res)=>{
//     try{
//         const jobsread=await Job.find({})
//         console.log(jobsread)
//         res.status(200).send(jobsread)
//     }catch(e){
//         res.status(401).send()
//     }
// })

// app.delete('/jobs', async(req,res)=>{
//     try{
//         const remove=await Job.deleteOne({"email": "asdrff@gmail.com"})
//         res.status(200).send(remove)
//     }catch(e){
//         res.status(404).send()
//     }
        
// })

// app.patch('/jobs/:id',async (req,res)=>{
//     const valid=Object.keys(req.body)
//     const validUpdates=['description','age','email','updated']
//     const validatingKeys=valid.every(key=>validUpdates.includes(key))
//     if(!validatingKeys){
//         return res.status(404).send("invlaid updates")
//     }
//     const _id=req.params.id
//     try{
//         const jobpatch=await Job.findByIdAndUpdate(_id,req.body,{new:true,runValidators:true})
//         res.status(200).send(jobpatch)
//     }catch(e){
//         res.status(404).send()
//     }
// })