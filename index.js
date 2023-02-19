require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const app = express()

//Importing Routes
const post = require('./routers/post')
const user = require('./routers/user')

//middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next()
})

//routes
app.use('/posts', post)
app.use('', user)

//connect to db
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONG_URI)
    .then(() => {
        //listen for request
        app.listen(process.env.PORT, () => {
            console.log('Server is running ', process.env.PORT);
        })
    })
    .catch((error) => {
        console.log(error);
    })
