fs = require('fs')
readData = () => {
    try{
        data = JSON.parse(fs.readFileSync('tasks.json').toString())
    }
    catch(e){
        data = []
    }
    return data 
}
writeData = (data) =>{
    try{
        fs.writeFileSync('tasks.json', JSON.stringify(data))
    }
    catch(e){
        fs.writeFileSync('tasks.json', '[]')
    }
}

addTask = (task) =>{
    allData = readData()
    allData.push(task)
    writeData(allData)
}
showAllTasks =(req, res)=>
{
 allTasks=  readData()
 res.render('showAllTasks.hbs',{allTasks})  
}
deleteSingleTask= (req, res)=>{
    allTasks = readData() 
    console.log(req.params.id) 
    index=allTasks.findIndex(elem => elem.id == req.params.id)
    allTasks.splice(index,1)
    writeData(allTasks)
    res.redirect('/')
}

editSingleTask=(req,res)=>{
    status={
        Status:0,
        Pending:0,
        InProgress:0,
        Solved:0
   }
   errors=[]
        
    allTasks = readData() 
    index=allTasks.findIndex(elem => elem.id == req.params.id)
    let task=allTasks[index]
    status[task['status']]=1;

    if(Object.keys(req.query).length == 0){
        res.render('addTaskForm',{pageTitle:'Edit task', taskTitle:task.title, taskContent:task.content,status})
       }
    else{
        if(req.query.title == '') errors.push('invalid title')
        if(req.query.content == '') errors.push('invalid content')

          if(errors.length == 0) {
            allTasks[index]= {id:task['id'],...req.query}
            writeData(allTasks)
            res.render('showSingleTask.hbs',{task:allTasks[index],successFlag:true}) 
          }
          else{
            res.render('addTaskForm.hbs',{taskTitle:task.title, taskContent:task.content,status,err:errors,errFlag:true}) 
          }
    }
}
addTaskController = ( req, res )=>{
    task = {
        id:'',
        title:'',
        content:'',
        status:''
    }
    status={
        Status:0,
        Pending:0,
        InProgress:0,
        Solved:0
   }
   errors=[]
   /*
    if(req.query.status)
        status[req.query.status]=1;
    if(req.query.title == '' || req.query.content == ''|| req.query.status=='Status'){
        task = req.query
    }*/
    if(Object.keys(req.query).length != 0){
            if(req.query.title == '') errors.push('invalid title')
            if(req.query.content == '') errors.push('invalid content')

            if(errors.length != 0) {
                res.render('addTaskForm.hbs',{taskTitle:req.query.title, taskContent:req.query.content,status,err:errors,errFlag:true}) 
                }
        
    if(req.query.title && req.query.content && req.query.status!='Status'){ 
        let id=  (new Date()).getTime()
        let task= {id,...req.query}
        console.log(status)
        console.log(task)
        addTask(task)
        req.query=null
        res.redirect('/')
    }
}
    res.render('addTaskForm', {pageTitle:'add new task', taskTitle:task.title, taskContent:task.content,status})

}
showSingleTask =(req, res)=>
{
 allTasks=  readData()
 index=allTasks.findIndex(elem => elem.id == req.params.id)
 res.render('showSingleTask.hbs',{task:allTasks[index]})  
}
module.exports = {
    addTaskController,
    showAllTasks,
    deleteSingleTask,
    editSingleTask,
    showSingleTask,

}