const env=require('dotenv').config()
const express=require('express')

const app=express()
const port=process.env.PORT_NO

app.use("/",require('./routes/index.js'))

app.listen(4050,()=>{
    console.log(`Server Is Running On Port ${port}.... `);
})

