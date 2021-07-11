const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const Course = require('./course.model')

const userSchema = new mongoose.Schema({
    fullName:{type:String, required:true, maxlength:100},
    email:{type:String,  required:true, unique:true, 
    validate(value){
        if(!validator.isEmail(value)) throw new Error('Email not valid SH')
    } },
    password:{type:String, required:true, unique:true},
    userType:{type:String,enum:['student','teacher','admin'],required:true},
    accountStatus:{type:Boolean, default:false},
    activateCode:{type:String},
    tokens:[{
        token:{type:String}
    }],
    createdCourses:[{
        course_id:{type:mongoose.Schema.Types.ObjectId}
    }],
    enrolledCourses:[{
        course_id:{type:String}
    }]
}
,{timestamps:true})


userSchema.pre('save',async function(){
    user= this
    
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,12)
    }
    
})
/*
userSchema.pre('remove',async function(next){
    try{
        user = this
        Course.deleteMany({user_id:user._id})
        next()
    }
    catch(e){
        throw new error(e)
    }
})
*/
userSchema.methods.toJSON = function(){
    const user = this.toObject()
    deleteItems = ['password']
    deleteItems.forEach(item=>{
        delete user[item]
    })
    return user
}

userSchema.methods.generateAuthToken = async function(){
    try{
    const user=this
    const id=user._id
    const token = jwt.sign({_id:id},process.env.JWTKEY)
    console.log(jwt.verify(token,process.env.JWTKEY))
    user.tokens= user.tokens.concat({token})
    await user.save()
    return token;
}
catch(e)
{
    console.log(e)
}
}

userSchema.statics.logUserIn= async (email, password)=>{
    const user = await User.findOne({email})
    if(!user) throw new Error('invalid email')
    const matchedPass= await bcrypt.compare(password, user.password)
    if(!matchedPass) throw new Error('invalid password')

    return user
}

userSchema.virtual('userCourses',{
    ref:'Course',
    localField:'_id',
    foreignField:'teacher_id'
})
const User= mongoose.model('User',userSchema)

module.exports= User