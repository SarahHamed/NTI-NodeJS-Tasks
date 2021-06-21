const express = require('express')
const opRouter = new express.Router()
const opController = require('../controller/operations.controller')



opRouter.get('/operations/:id', opController.showOperations)  //the user id
opRouter.get('/showSingleOp/:id', opController.showSingleOperation) 
opRouter.get('/delete/:id', opController.deleteOperation) 
opRouter.get('/edit/:id', opController.editOperationForm) 
opRouter.post('/edit/:id', opController.editOperationPost) 



opRouter.get('/addOperation',opController.addOperationForm)
opRouter.post('/addOperation',opController.addOperation)



module.exports= opRouter