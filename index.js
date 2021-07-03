const express=require('express')
var app=express()

app.use("/",require('./routes/departments.js'))
app.use('/',require('./routes/categories.js'))

app.listen(4050,()=>{
    console.log("RUNNING...");
})

