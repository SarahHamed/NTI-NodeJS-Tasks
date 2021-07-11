const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Course = require('../models/course.model')
const multer= require('multer')
const fs= require('fs')



uploadFile=(fileType,req)=>
{
    console.log(req.file)
    console.log(req.files)
    if(req.file){
        console.log("req.file")
    let fileExt=req.file.originalname.split('.').pop() 
    fileExt='.' + fileExt
    let fileName=`public\\uploads\\${fileType}\\`+req.file.originalname.replace(fileExt, "").trim()
    fileName += fileExt
   
    fileWithExt = `${req.file.path}.${req.file.originalname.split('.').pop()}`
    fs.rename(req.file.path,fileName, (err)=>{ if(err) console.log(err) })
}
else if(req.files){
    console.log("inside req.files")
    files=['video','document']
    console.log(req.files[0])
    console.log(req.files['video'])
    let uploadedFiles={}

    files.forEach(f=>{
    if( req.files[f]){
         uploadedFiles[f]=req.files[f][0].originalname
    let fileExt=req.files[f][0].originalname.split('.').pop() 
    fileExt='.' + fileExt
    let fileName=`public\\uploads\\`+req.files[f][0].originalname.replace(fileExt, "").trim()
    fileName += fileExt
   
    fileWithExt = `${req.files[f][0].path}.${req.files[f][0].originalname.split('.').pop()}`
    fs.rename(req.files[f][0].path,fileName, (err)=>{ if(err) console.log(err) })
        }
        
    })
    return uploadedFiles;
}

}


module.exports.uploadFile = uploadFile