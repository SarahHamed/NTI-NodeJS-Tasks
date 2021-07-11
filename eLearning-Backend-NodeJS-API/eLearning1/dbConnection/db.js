const mongoose=require('mongoose')

try{
    mongoose.connect(process.env.DBURL,{
        userCreateIndex:true,
        useFindAndModify:true,
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
}
catch(e)
{
    console.log(e)
}
