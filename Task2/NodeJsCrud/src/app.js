const express = require('express')
const hbs = require('hbs')
const path = require('path')
const todoRoutes = require('../routes/todo.routes')

const app=express()
app.set('view engine', 'hbs')

app.use(express.static(path.join(__dirname, '../frontend')))
app.set('views', path.join(__dirname,'../resources/views'))
hbs.registerPartials(path.join(__dirname,'../resources/layouts'))


app.use(todoRoutes)

module.exports = app



/*
app.get('', (req,res)=>{
    res.render('index')
})
*/
/*
app.get('/allTasks', (req,res)=>{
    res.render('allTasks')
})
*/
/*
app.get('/addTaskForm', (req,res)=>{
    res.render('addTaskForm')
})
*/

/*
const taskContoller = require('../controllers/taskApp.controller')
app.get('/addTaskForm', taskContoller.addTaskController)
app.get('/showAllTasks',taskContoller.showAllTasksController)
app.get('/delete/:id',taskContoller.deleteSingleTask)
app.get('/edit/:id',taskContoller.editSingleTask)

*/
