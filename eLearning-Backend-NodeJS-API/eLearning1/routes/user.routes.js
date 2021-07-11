const express = require('express')
const router = express.Router()
const User = require('../models/user.model')
const auth = require('../middleware/auth')

router.post('/:userType/signUp', async(req,res)=>{
    try{
    signupData = {
        ...req.body,   
        userType: req.params.userType
    }
    let user = new User(signupData)
    user.activateCode=(new Date()).getTime().toString()
    await user.save() 
    res.status(200).send({
        status:true,
        message:"data inserted",
        data:{user}
    })
}
catch(e){
    res.status(500).send({
        status:false,
        message:e.message ,
        error:"faled inserting"
    })
}
})

router.post('/user/login',async(req,res)=>{
    try{
        const user = await User.logUserIn(req.body.email, req.body.password)
        if(!user.accountStatus){throw new Error('your account isn\'t active')}
        const token = await user.generateAuthToken()

        res.status(200).send({
            status:true,
            message:"logged in",
            data:{token,user}
        })
    }
    catch(e)
    {
        res.status(500).send({
            status:false,
            error:e.message,
            message:"error logging in SH"
        })
    }
})

router.get('/user/activateMe',async(req,res)=>{
    try{
    data=req.query
    if(!req.query.email || !req.query.key) 
        { 
            throw new Error('Invalid URL SH')
            //res.send('Invalid URL')
        }
    let user= await User.findOne({email:req.query.email})

    if(user.accountStatus) 
        res.send('already active')

    if(user.activateCode==data.key){
        user.accountStatus=true
        user.activateCode=null
        await user.save()
        res.status(200).send("done, your accout has been activated please try to log in")
    }
}
catch(e)
{
    res.status(500).send({error:e.message})}
})

router.get('/myProfile',auth.generalAuth,async(req,res)=>{
    res.send(
        {
            user:req.user,
            token:req.token,
            profile:"show my profile"
        })
})

router.delete('/user/delete',auth.generalAuth, async(req,res)=>
{
   try{
    await req.user.remove()
    res.status(200).send({
        message :"user's been deleted successfull"
    })
   }
   catch(e)
   {
       res.status(500).send(e) 
   }

})

router.post('/user/logoutAll',auth.generalAuth,async(req,res)=>{
    try{
        console.log(req)
        req.user.tokens=[]
        await req.user.save()
        res.status(200).send({
            status:true,
            message:"logged out from all"
        })
    }
    catch(e)
    {
        res.status(500).send({
            status:false,
            error:e.message,
            message:'error',
            
        })
    }
})

router.post('/user/logout',auth.generalAuth,async(req,res)=>{
    try{
        console.log(req)
        req.user.tokens=req.user.tokens.filter( t =>t.token!=req.token)
        await req.user.save()
        res.status(200).send({
            status:true,
            message:"logged out successfuly"
        })
    }
    catch(e)
    {
        res.status(500).send({
            status:false,
            error:e.message,
            message:'error',
            
        })
    }
})

router.post('/user/deactivate',auth.generalAuth,async(req,res)=>{
    try{
        if(req.user.accountStatus && req.user.activateCode==null)
        {
            req.user.activateCode = (new Date()).getTime().toString()
            req.user.accountStatus = false
            await req.user.save()
            res.send({message:"account has been deactivated"})
        }
    else{
      throw new Error('this account is already not active')
    }
}
    catch(e){
        res.status(500).send({
            status:false,
            error:e.message,
            message:'error',
            
        })
    }
})

router.patch('/user/edit',auth.generalAuth,async(req,res)=>{
    feildsUpdate = Object.keys(req.body) 
    allowed = ['fullName', 'password']
    isValidUpdate =feildsUpdate.every(feild=>allowed.includes(feild) )
    try{
    if(isValidUpdate)
    {
        feildsUpdate.forEach(update=>{
            req.user[update]=req.body[update]
        })
        await req.user.save()
        res.status(200).send(
            {
                status:true,
                message:"user data has been updated!"
            }
        )
    }
    else{
        res.status(500).send(
            {
                status:false,
                message:"failed to update user, invalid updates"
            }
        )
    }
}
catch(e)
{
    res.status(500).send(e) 
}
})

router.post('/course/add/:course_id',auth.generalAuth,async(req,res)=>{
    try{
       // const course = await Course.findById(req.params.course_id)
        req.user.enrolledCourses.push({course_id:req.params.course_id})
        await req.user.save()
        res.status(200).send(
            {status:true,user:req.user, message:"you've enrolled successfully"}
        )
    }
    catch(e)
    {
        res.status(500).send({status:false,message:e.message})
    }
})
module.exports= router