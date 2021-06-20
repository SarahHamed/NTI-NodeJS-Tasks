const express = require('express')
const router = new express.Router()
const todoControllers = require('../controllers/taskApp.controller')

router.get('',todoControllers.showAllTasks)
router.get('/addTaskForm', todoControllers.addTaskController)
router.get('/edit/:id', todoControllers.editSingleTask)
router.get('/delete/:id', todoControllers.deleteSingleTask)
router.get('/show/:id', todoControllers.showSingleTask)

module.exports=router