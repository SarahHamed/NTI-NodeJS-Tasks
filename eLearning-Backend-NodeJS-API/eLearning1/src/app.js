const express = require('express')
const userRoutes = require('../routes/user.routes')
const courseRoutes = require('../routes/course.routes')
const cors= require('cors')
const app=express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
require('../dbConnection/db')
app.use(express.static('public'))
//app.use('uploads', express.static('public'))
//const userModel = require('../models/user.model')



app.use(cors())

app.use(userRoutes)
app.use(courseRoutes)



module.exports = app

