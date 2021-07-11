const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const multer= require('multer')
const courseController = require('../controller/courses.controller')

var upload = multer({ dest: 'contents' })
var uploadImg = multer({ dest: 'public/uploads/images' })

router.post('/addCourse',auth.teacherAuth,uploadImg.single('icon') ,courseController.addCourse)

router.patch('/addLesson/:courseID',
auth.teacherAuth,
upload.fields([{name: 'video', maxCount: 1}, {name: 'document', maxCount: 1}]) ,
courseController.addLesson)

router.post('/myCourses',auth.teacherAuth,courseController.showMyCourses)


router.post('/course/show/:course_id',auth.teacherAuth,courseController.showCourse)


router.delete('/course/delete/:course_id',auth.teacherAuth,courseController.deleteCourse)

router.patch('/course/edit/:course_id',auth.teacherAuth,uploadImg.single('icon'),courseController.editCourse)
router.patch('/lesson/edit/:course_id/:lessonNum',auth.teacherAuth,
upload.fields([{name: 'vid', maxCount: 1}, {name: 'doc', maxCount: 1}]) ,
courseController.updateLesson)

router.delete('/lesson/delete/:course_id/:lessonNum',auth.teacherAuth,courseController.deleteLesson)
router.get('/lesson/show/:course_id',auth.teacherAuth,courseController.showAllLessons)
router.get('/course/show',auth.generalAuth,courseController.showAllCourses)
//router.post('/course/add/:course_id',auth.generalAuth,courseController.enrollToCourse)

module.exports= router