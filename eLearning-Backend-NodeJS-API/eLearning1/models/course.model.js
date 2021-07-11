const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    title:{type:String, required:true, unique:true, maxlength:100},
    teacher_id: { type:mongoose.Schema.Types.ObjectId, required: true, ref:'User'},
    //room_id: { type:mongoose.Schema.Types.ObjectId, ref:'Chat'}, //add reqired later
    Category:{type:String, 
        enum:['Business','Software','Marketing','Other'],
        required:true},
    description:{type:String},
    icon:{ type:String, trim:true, default:null},
    lessons:[
        {
            lessonName:{type: String, 
                required: true
            },
            lessonNumber:{type:Number},
            video:{ type:String, trim:true, default:null},
            document:{type:String, trim:true, default:null},
            details:{type:String, trim:true},
        }
    ]
},
{timestamps:true})

/*
courseSchema.pre('save',async function(next){
    course= this
    if(!course.course_id)
    course.course_id=course.title+(new Date()).getTime().toString()
    //console.log(course.course_id)
    next()
})
*/

const Course = mongoose.model('Course',courseSchema)
module.exports = Course