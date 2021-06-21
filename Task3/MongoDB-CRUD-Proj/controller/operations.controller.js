const dbConnection = require('../db/db')
const {ObjectID} =require('mongodb')
const session = require('express-session')


showOperations=(req,res)=>{
    id=req.params
   // res.render('operations',id)
   if(req.session.user){
    dbConnection(db=>{
        db.collection('Operation').find().toArray((err,operations)=>{
                if(err) console.log(err)
                else res.render('operations',{operations})
            })
        })
    }
    else{
        res.send('please log in first')
    }
}

addOperationForm=(req,res)=>{
    if(req.session.user)
        res.render('addOperation')
    else 
        res.send('please log in first')
}
addOperation=(req,res)=>{
    newOperation={userId:req.session.user,...req.body}

    dbConnection(dbClient=>{
        if(!dbClient) return console.log('database error')
        dbClient.collection('Operation').insertOne(newOperation, (err,opDetails)=>{
            if(err) console.log(err)
            else console.log(opDetails)
        })
    })
    res.redirect(`/operations/${req.session.user}`)
}

showSingleOperation=(req,res)=>{
    let id = req.params.id

    dbConnection(db=>{
        db.collection('Operation').findOne({_id:new ObjectID(id)},(err,operation)=>{
             res.render('single',{operation})
        })
    })
}

deleteOperation=(req,res)=>{
    let id = req.params.id
    if(req.session.user)
    {
        userId=req.session.user
        dbConnection(db=>{
            db.collection('Operation').deleteOne({_id:new ObjectID(id)},(err,operation)=>{
                //res.render('single',{operation})
                res.redirect(`/operations/${userId}`)
            })
        })
}
    else 
        res.send('please log in first')
}
editOperationPost=(req,res)=>{
    id= req.params.id
    editedData=req.body
    userId=req.session.user
    dbConnection(db=>{
        db.collection('Operation').updateOne({_id:new ObjectID(id)},{
            $set:{amount:editedData.amount,date:editedData.date,location:editedData.location}
        },(err,operation)=>{
            res.redirect(`/operations/${userId}`)
        })
    })
}
editOperationForm=(req,res)=>{
    let id = req.params.id

    dbConnection(db=>{
        db.collection('Operation').findOne({_id:new ObjectID(id)},(err,operation)=>{
             res.render('addOperation',{operation})
        })
    })
  //  res.render('addOperation',operationData)
}

module.exports={
    showOperations,
    addOperationForm,
    addOperation,
    showSingleOperation,
    deleteOperation,
    editOperationPost,
    editOperationForm
}