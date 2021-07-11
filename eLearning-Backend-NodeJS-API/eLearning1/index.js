app = require('./src/app')

app.get('/',(req,res)=>{res.send("test")})
app.listen(process.env.PORT)