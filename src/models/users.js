const validator=require('validator')
const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

const userSchema=new mongoose.Schema({      // when we are passing a mongoose model we are passing an object in as the second argument to model. Now when we pass th eobject as second arugument behind the scenes the mongoose converts it into what known as a SCHEMA in order to take the advantage of middleware functionality all we have to do is create the schema first and pass that in.
    name:{
        type:String,
        trim:true,
        required:true,
    },
    email:{
        required:true,
        unique:true,
        trim:true,
        type:String,
        validate(email){
            if(!validator.isEmail(email)){
                throw new Error("invalid email")
            }
        },
    },
    password:{
        required:true,
        type: String,
        trim:true,
        minlength:6,
        validate(value){
            if(value.includes('password')){
                throw new Error('not supported')
            }
        }
    },
    tokens:[{
        token:{
            type:String,
            required:true,
        }
    }],
 
},{
    timestamps:true
})

userSchema.virtual('mysources',{
    ref:'Source',
    localField:'_id',
    foreignField:'owner'
})

userSchema.statics.findByCredentails=async (email,password)=>{
    const user=await User.findOne({email})
    console.log(user)
    if(!user){
        throw new Error('invalid login attempt')
    }

    const match=await bcrypt.compare(password,user.password)
    console.log(match)
    if(!match){
        throw new Error('invalid login attempt')
    }
    return user
}



userSchema.methods.generatingToken= async function(){

    const user=this
    console.log("user ",user)
    const token=jwt.sign({_id:user._id.toString()},'sometext')
    user.tokens=user.tokens.concat({token})
    await user.save()
    return token
}

userSchema.methods.toJSON=function(){
    const user=this
    const userObject=user.toObject()
    delete userObject.password
    delete userObject.tokens
    console.log("deletingTOkens ", typeof(userObject))
    return userObject
}

userSchema.pre('save',async function(next){
    const user=this
    console.log("just before saving. hashing the password")
    if(user.isModified('password')){
        user.password=await bcrypt.hash(user.password,8)
    }

    next()
})

const User=mongoose.model('User',userSchema)

module.exports=User




















// const jobs=mongoose.model('job',{      // when we are passing a mongoose model we are passing an object in as the second argument to model. Now when we pass th eobject as second arugument behind the scenes the mongoose converts it into what known as a SCHEMA in order to take the advantage of middleware functionality all we have to do is create the schema first and pass that in.
//     description:{
//         type:String,
//         trim:true,
//         required:true,
//     },
//     email:{
//         required:true,
//         unique:true,
//         trim:true,
//         type:String,
//         validate(email){
//             if(!validator.isEmail(email)){
//                 throw new Error("invalid email")
//             }
//         },
//     },
//     password:{
//         required:true,
//         type: String,
//         trim:true,
//         minlength:6,
//         validate(value){
//             if(value.includes('password')){
//                 throw new Error('not supported')
//             }
//         }
//     },
//     updated: { type: Date, default: Date.now },
//     age:{ type:Number, min:1, max:100 },
// })