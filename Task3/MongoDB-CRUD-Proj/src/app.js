const express = require('express')
const path = require('path')
const hbs = require('hbs')
const userRoutes = require('../routes/users.routes')
const opRoutes = require('../routes/operations.routes')
const app = express()
const session= require('express-session')

app.set('view engine','hbs')
app.use(express.static(path.join(__dirname, '../public')))
hbs.registerPartials(path.join(__dirname,'../frontend/layouts'))
app.set('views',path.join(__dirname, '../frontend/views'))
app.use(session({secret:'abc'}))


app.use(express.urlencoded())
app.use(userRoutes)
app.use(opRoutes)

module.exports = app