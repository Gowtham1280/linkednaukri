const mongoose=require('mongoose')
const validator=require('validator')
const User=require('./users')
const sourceSchema=new mongoose.Schema({

    description:{
        type:String,
        trim:true,
        required:true,
    },
    role:{
        type:String,
        required:true,
        trim:true
    },
    age:{ 
        type:Number, 
        min:18, 
        max:60,
        required:true
    },
    owner:{
        type:mongoose.Types.ObjectId,   // type for this is ObjectId as we are storing user by his ID . as this line is saying data stored in this owner is going to be ObjectId
        required:true,
        ref:'User'                      //having refernece from owner field to another model
    }
})

const source=new mongoose.model('Source',sourceSchema)

module.exports=source






















       // updated:{
    //      type: Date, 
    //      default: Date.now 
    // },