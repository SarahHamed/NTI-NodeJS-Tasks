const mongoose = require('mongoose')

const chatScheme = new mongoose.Schema({
    student_id:{type:mongoose.Schema.Types.ObjectId, required: true, ref:'User'},
    teacher_id: { type:mongoose.Schema.Types.ObjectId, required: true, ref:'User'},
    course_id: { type:mongoose.Schema.Types.ObjectId, ref:'Course'}, //add reqired later

    message:[
        {
            sender_id:{type: String, 
                required: true
            },
            message:{ type:String},
        },
        {timestamps:true}
    ]
},
{timestamps:true})

const Chat = mongoose.model('Chat',chatScheme)
module.exports = Chat