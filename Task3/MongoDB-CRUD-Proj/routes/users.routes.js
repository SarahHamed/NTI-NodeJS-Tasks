const express = require('express')
const router = new express.Router()
const userController = require('../controller/users.controller')

router.get('',(req,res)=>res.redirect('/login'))

router.get('/signUp',userController.signupLogInForm)
router.post('/signUp',userController.addNewUser)

router.get('/login',userController.signupLogInForm)
router.post('/login',userController.logIn)
/*
router.get('/operations/:id', userController.showOperations)  //the user id
router.get('/showSingleOp/:id', userController.showSingleOperation) 
router.get('/delete/:id', userController.deleteOperation) 
router.get('/edit/:id', userController.editOperationForm) 
router.post('/edit/:id', userController.editOperationPost) 



router.get('/addOperation',userController.addOperationForm)
router.post('/addOperation',userController.addOperation)
*/


module.exports= router