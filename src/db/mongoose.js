const mongoose=require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/siemens',{
    useUnifiedTopology:true,
    useNewUrlParser:true,
    useFindAndModify:false,
    useCreateIndex:true,
})
















// const { ObjectId, ObjectID } = require('mongodb')
// const job=mongoose.model('job',{
    //     description:{
    //         type:String,
    //         trim:true,
    //         required:true,
    //     },
    //     email:{
    //         required:true,
    //         trim:true,
    //         type:String,
    //         validate(email){
    //             if(!validator.isEmail(email)){
    //                 throw new Error("invalid email")
    //             }
    //         },
    //     },
    //     age:{
    //         type:Number,
    //         min:18,
    //         max:100,
    //     },
    //     updated: { type: Date, default: Date.now },
    // })

    // const me=new job({
//     description:"React.js developer  ",
//     email:"ch.gowtham19699@gmail.com",
//     age:99,
// })

// me.save().then(()=>{
//     console.log(me)
// }).catch((e)=>{
//     console.log(e)
// })
