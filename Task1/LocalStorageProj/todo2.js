getAllTasks = () => {
    return allTasks = JSON.parse(localStorage.getItem('tasks')) || []
}

storeAllTasks = (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks)) 
}

const taskHeads = ["id", "title", "content", "taskType", "dueDate", "status", "important"]
const taskElements = ["title", "content", "taskType", "dueDate"]
let updateFlag=0;
let taskToBeEdited={};
//let initialTask= { title: "title2", content: "njkncsanc", taskType: "1", dueDate: "2021-06-10", status: true}
//let updatedTask= {id:1623186218762 , title: "title2", content: "updated", taskType: "1", dueDate: "2021-06-10", status: false}

const createCustomElement = (parent, element, classes , attributes, text) => {
    const myElement = document.createElement(element)
    parent.appendChild(myElement)
    if(classes != '') myElement.className = classes
    if(text != '') myElement.textContent = text
    if(attributes.length != 0){    
        attributes.forEach(attribute=>{
            myElement.setAttribute(attribute.attrName, attribute.attValue)
        })
    }
    return myElement
}

const addNewTask=(task)=>{

    let newTask=
    {
        id:task.id,
        title: task.title,
        content: task.content,
        taskType:task.taskType,
        dueDate:task.dueDate,
        status:task.status,
        important:task.important
    }
    let tasks = getAllTasks();
  //  console.log(tasks)
    tasks.push(newTask);
    storeAllTasks(tasks)
}

const drawTask=(task)=>{
    let showAllTasksSec= document.querySelector("#showAllTasks");

    taskUnitDiv=createCustomElement(showAllTasksSec, "div", "col-4" , '', '') 
    innerDiv = createCustomElement(taskUnitDiv, 'div', 'm-2 bg-primary p-3', [], '')
    taskHeads.forEach(h=>{
        rowDiv = createCustomElement(innerDiv, 'div', '', [], '')
        key = createCustomElement(rowDiv, "span", "", [{attrName:"style", attValue:"color:white"}], h+": ")
        h5 = createCustomElement(rowDiv, "span", "", [], task[h])
    })
    delBtn = createCustomElement(innerDiv, 'button', 'btn btn-danger c m-2', [], 'delete')
    editBtn = createCustomElement(innerDiv, 'button', 'btn btn-warning c m-2', [], 'Edit')

    delBtn.addEventListener('click', function(e){
        deleteTask(task['id'])
        console.log(this.parentElement)
        this.parentElement.parentElement.remove()
    })

    editBtn.addEventListener('click',function(e){
        //alert("edit")
     /*   taskHeads.forEach(h=>{
            if(h!="id")
             document.querySelector('#addTask').target.elements[h]=task[h]
        })
        console.log(task)
        console.log(task.id)*/
        arrOfTasks=getAllTasks()
        index=arrOfTasks.findIndex((t)=>t.id==task.id)
        task=arrOfTasks[index]
        console.log( document.getElementsByName('title')[0])
        
        taskElements.forEach(elemName=>{
            document.getElementsByName(elemName)[0].value=task[elemName]
        })
        /*
             document.getElementsByName('title')[0].value=task['title']
             document.getElementsByName('content')[0].value=task['content']
             document.getElementsByName('taskType')[0].value=task['taskType']
             document.getElementsByName('dueDate')[0].value=task['dueDate']
        */
             document.getElementsByName('status')[0].checked=task['status']
             document.getElementsByName('important')[0].checked=task['important']
             document.getElementsByName('important')[1].checked=task['important']
             console.log(document.getElementById('formBtn'))
             document.getElementById('formBtn').innerHTML="Update"
             updateFlag=1;
             taskToBeEdited=task.id;  //mainfa3sh ysawy l task l 2dem
    
    })

}

const showAllTasks=()=>
{
    let tasks = getAllTasks();    
    tasks.forEach(task=>{
        drawTask(task)
    })
    console.log(tasks)
    // tasks.forEach(task=>{
    //     console.log(`id: ${task.id} & title: ${task.title} & content: ${task.content} & taskType: ${task.taskType} & dueDate: ${task.dueDate} & status: ${task.status}`)
    // })
    
}

const showSingleTask=(taskId)=>
{
    let tasks = getAllTasks();
    console.log(tasks)
    index=tasks.findIndex(elem => elem.id == taskId)
    if(index == -1)
        return alert("task not found")
    else{
        drawTask(tasks[index])
        console.log(`id: ${tasks[index].id} & title: ${tasks[index].title} & content: ${tasks[index].content} & taskType: ${tasks[index].taskType} & dueDate: ${tasks[index].dueDate} & status: ${tasks[index].status}`)
    }
    drawTask(tasks[index])
}

const editTask = (Task) =>
{
    let tasks = getAllTasks();
    index=tasks.findIndex(elem => elem.id == Task.id)
    if(index == -1)
        return console.log("task not found")
    else{
        tasks[index]=Task
        console.log("index= "+index)
        console.log(Task)

        storeAllTasks(tasks)
        //update DOM with the new edited task 
        console.log("update DOM with the new edited task ")

        tasksList = document.querySelectorAll('.col-4 .bg-primary')[index].getElementsByTagName('div');
        console.log(`tasklist elemnts : ${tasksList.length}`)
        for(i=0;i<tasksList.length;i++)
        {
           console.log( tasksList[i].children[1].innerHTML)
           tasksList[i].children[1].innerHTML=Task[taskHeads[i]]
        }
        /*
        taskInnerElements=tasksList[index].children;

        console.log(`children length ${taskInnerElements=tasksList[index].children.length}`)
        console.log(`${tasksList[0].innerHTML}`)
        console.log(`tasksList:`)
        console.log(`${taskInnerElements}`)
        */

      /*  tasks[index].forEach((editedContent,i)=>{
            taskInnerElements[i].innerHTML=editedContent
            console.log(`editedContent: ${editedContent}`)
            console.log(`taskInnerElements[i]: ${taskInnerElements[i]}`)
        })*/
    }
    
}

const deleteTask = (taskId) =>
{
    let tasks = getAllTasks();
    index=tasks.findIndex(elem => elem.id == taskId)
    if(index == -1)
        return console.log("task not found")
    else{
        tasks.splice(index,1)
        console.log("index= "+index)
    }
    storeAllTasks(tasks)
}

document.querySelector('#addTask').addEventListener('submit', function(e){
    e.preventDefault();
    newTask={}
    // **Note** if update flag ==1 then use  update task else use the add task 
    if(updateFlag==1)
    {
        taskHeads.forEach((h=>{
            if(h!="id") {
                if(h=="status") newTask[h]=e.target.elements[h].checked
                else newTask[h]=e.target.elements[h].value
            }
            else newTask[h]=taskToBeEdited
        }))
        editTask(newTask)
        updateFlag=0;
       // showSingleTask(taskToBeEdited)
        this.reset();

    }
    else{
    taskHeads.forEach((h=>{
        if(h=="id") newTask[h]= (new Date()).getTime()
        else{
            console.log("e.target.elements[h]")
            if(h=="status") newTask[h]=e.target.elements[h].checked
            else newTask[h]=e.target.elements[h].value

    }
    }))

    addNewTask(newTask)
    showSingleTask(newTask['id'])
}
})

showAllTasks()




//addNewTask(initialTask)
//addNewTask(initialTask)

/*showAllTasks();

editTask(updatedTask);

showAllTasks();

deleteTask(1623186218766);
console.log("after delete")
showAllTasks();

console.log("show task")
showSingleTask(1623187355604)
*/
