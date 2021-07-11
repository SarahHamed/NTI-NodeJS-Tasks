const express = require('express')
const mongoose = require('mongoose')
const Course = require('../models/course.model')
uploadFilesHelper= require('../helpers/uploadFiles.helper')


addCourse = async(req,res)=>{
    try{
        uploadFilesHelper.uploadFile('images',req)
        const courseData={teacher_id:req.user._id, ...req.body,icon:req.file.originalname}
        let course = new Course(courseData)
        await course.save() 
        res.send(course)
    }
    catch(e)
    {
        res.status(500).send(
            {
                message: e.message
            }
        )
    }

    }
 addLesson = async(req,res)=>{
   
     try{
        if( Object.keys(req.body).includes("lessonNumber"))
        throw Error("you can't change lesson number")
        const course = await Course.findOne({
            _id: mongoose.Types.ObjectId(req.params.courseID)
        })
       
        let uploadedFiles=uploadFilesHelper.uploadFile('',req)
        const courseData={...uploadedFiles,...req.body,lessonNumber:course.lessons.length +  1}
       course.lessons.push(courseData)
        await course.save() 
        res.send(courseData)
    }
    catch(e)
    {
        res.status(500).send(
        {
            status:"false",
            message:e.message
        })
    }
    }
    
showMyCourses = async(req,res)=>{    
        await req.user.populate({
            path:'userCourses'
        }).execPopulate()
        res.send(req.user.userCourses)
       // res.send(courses)
    }
showCourse = async(req,res)=>{
    try{
        const course = await Course.findById(req.params.course_id)
        res.status(200).send(
            {status:true,course}
        )
    }
    catch(e)
    {
        res.status(500).send({status:false,message:e.message})
    }
}
deleteCourse = async(req,res)=>{
    try{
    const course = await Course.findOne({
        _id: mongoose.Types.ObjectId(req.params.course_id)
    })
    if(req.user._id == course.teacher_id.toString()){

        await Course.deleteOne({ _id: mongoose.Types.ObjectId(req.params.course_id)})
        res.status(200).send(
            {status:true,message:"course has been deleted successfully "}
        )
    }
    else{
        throw new Error("you're not authorized to delete this course")
    }
}
    catch(e){
        res.status(500).send({status:false,message:e.message})
    }
}
updateLesson = async(req,res)=>{
    if( Object.keys(req.body).includes("lessonNumber"))
     throw Error("you can't changr lesson number")
    try{
        const course = await Course.findOne({
            _id: mongoose.Types.ObjectId(req.params.course_id)
        })
        uploadedFiles=uploadFilesHelper.uploadFile('',req)

    const courseData={...uploadedFiles,...req.body}
   course.lessons[ parseInt(req.params.lessonNum) -1]=courseData
    await course.save() 
        res.status(200).send(course.lessons  [parseInt(req.params.lessonNum) -1])
    }
    catch(e){
        res.status(500).send({message:e.message})
    }
 
    
}

editCourse = async(req,res)=>{
    feildsUpdate = Object.keys(req.body) 
    allowed = ['icon', 'title','Category','description','lessons']

    const course = await Course.findOne({
        _id: mongoose.Types.ObjectId(req.params.course_id)
    })

    isValidUpdate =feildsUpdate.every(feild=>allowed.includes(feild) )
    try{
    if(isValidUpdate)
    {
        feildsUpdate.forEach(update=>{
            // console.log("update")
            // console.log(req.body[update])
            course[update]=req.body[update]
        })
       if(req.file){
           if(req.file.fieldname=="icon"){
         uploadFilesHelper.uploadFile('images',req)
         course['icon']=req.file.originalname
       }
    }
        await course.save()
        res.status(200).send(
            {
                status:true,
                message:"course data has been updated!"
            }
        )
    }
    else{
        res.status(500).send(
            {
                status:false,
                message:"failed to update course, invalid updates"
            }
        )
    }
}
catch(e)
{
    res.status(500).send({
        status:false,
        error:e.message,
        message:"something went wrong"
    }) 
}
}
deleteLesson = async (req,res)=>{
    const course = await Course.findOne({
        _id: mongoose.Types.ObjectId(req.params.course_id)
    })
    console.log(course.lessons[req.params.lessonNum-1])
    course.lessons.splice(req.params.lessonNum-1,1)

    await course.save()
    res.send("done")
}
showAllLessons= async(req,res)=>{
    const course = await Course.findOne({
        _id: mongoose.Types.ObjectId(req.params.course_id)
    })
    res.send(course.lessons) 
}

showAllCourses= async(req,res)=>{
    const courses = await Course.find()
    res.send(courses) 
}

/* enrollToCourse = async(req,res)=>{
    try{
        const course = await Course.findById(req.params.course_id)
        course.
        res.status(200).send(
            {status:true,course}
        )
    }
    catch(e)
    {
        res.status(500).send({status:false,message:e.message})
    }
}
 */
module.exports={
    addCourse,
    addLesson,
    showMyCourses,
    deleteCourse,
    editCourse,
    updateLesson,
    deleteLesson,
    showAllLessons,
    showCourse,
    showAllCourses,
    //enrollToCourse
}