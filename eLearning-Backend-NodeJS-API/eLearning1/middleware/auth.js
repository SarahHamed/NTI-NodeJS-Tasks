const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

const studentAuth = async(req,res,next)=>{
try{
    const token = req.header('Authorization').replace('bearer ','')
    const myDecodedToken = jwt.verify(token, procees.env.JWTKEY)

    const user = await User.findOne({
        _id:myDecodedToken._id,
        'tokens.token':token,
        userType:'student'
    })
    if(!user) throw new Error('you\'re not logged in SH')
    req.user=user
    req.token=token
    next()
}
catch(e){
    res.status(500).send({
    status:fasle,
    error:e.message,
    message:'unauthorized'
    })
}
}

const teacherAuth = async(req,res,next)=>{
    try{
        const token = req.header('Authorization').replace('bearer ','')

        const myDecodedToken = jwt.verify(token, process.env.JWTKEY)

        const user = await User.findOne({
            _id:myDecodedToken._id,
            'tokens.token':token,
            userType:'teacher'
        })
        if(!user) throw new Error('you\'re not logged in SH')
        req.user=user
        req.token=token
        next()
    }
    catch(e){
        res.status(500).send({
        status:false,
        error:e.message,
        message:'unauthorized at all'
        })
    }
    }

    const adminAuth = async(req,res,next)=>{
        try{
            const token = req.header('Authorization').replace('bearer ','')
            const myDecodedToken = jwt.verify(token, procees.env.JWTKEY)
        
            const user = await User.findOne({
                _id:myDecodedToken._id,
                'tokens.token':token,
                userType:'admin'
            })
            if(!user) throw new Error('you\'re not logged in SH')
            req.user=user
            req.token=token
            next()
        }
        catch(e){
            res.status(500).send({
            status:fasle,
            error:e.message,
            message:'unauthorized'
            })
        }
        }

        const generalAuth = async( req, res, next ) => {
            try{
                const token = req.header('Authorization').replace('bearer ','')
                const myDecodedToken = jwt.verify(token, process.env.JWTKEY)
                const user = await User.findOne({
                    _id:myDecodedToken._id,
                    'tokens.token':token,
                })
                if(!user) throw new Error()
                req.user=user
                req.token=token
                next()
            }
            catch(e){
                res.status(500).send({
                    status:false,
                    error:e.message,
                    message: 'unauthorized, you\'re not logged in'
                })
            }
        }
        
    
module.exports = {studentAuth, teacherAuth, adminAuth, generalAuth}