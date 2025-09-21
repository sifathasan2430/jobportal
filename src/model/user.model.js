import mongoose, { Schema } from 'mongoose'

import bcrypt from 'bcrypt'

const userSchema=new Schema({
    firstName:{
        type:String,
        required:[true,'Please provide username'],
         unique:true,
         index:true,
    },
     lastName:{
        type:String,
        required:[true,'Please provide username'],
         unique:true,
         index:true,
    },
     email:{
        type:String,
        required:[true,'Please provide username'],
       unique:true,
       match:[/.+\@.+\..+/,'gives valid email']
    },
    password:{
        type:String,
        required:['true','please provide password']
    },
   
    verifyCode:{
        type:String,
        required:[true,'Please provide username'],
    
    },
      verifyCodeExpiry:{
        type:Date,
        required:[true,'Please provide username'],
    
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    role:{
        type:String,
        enum:['job_seeker','employer','admin'],
        required:true
    },
    phoneNumber:{
        type:number,
        required:'true'
    },
      profilePicture:{
        type:String,
    
    }
   

},
{timestamps:true}
)
userSchema.pre('save',async function (next) {
    if (!this.isModified('password')) return next()
        this.password=await bcrypt.hash(this.password,10)
    next()
    
})
userSchema.methods.isPasswordCorrect=async function (password) {
     
    const response=await bcrypt.compare(password,this.password)
    return response
    
}

const User=mongoose.models.users || mongoose.model('users',userSchema)
export default User