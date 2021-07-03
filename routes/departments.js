const express=require('express');
var router=express()
var router=express.Router()
const knex = require('../connect/connect.js')


// Get Departments
router.get('/departments',(req,res)=>{
    knex('department').select('*').then(data=>{
        res.send(data)
    }).catch(err=>{res.send(er)})
})


// Get Department by ID
router.get('/departments/:department_id',(req,res)=>{
    if(req.params.department_id<=3){
        knex.select('*').from('department').where('department_id',req.params.department_id).then(data=>{
            res.send(data)
        }).catch(err=>{res.send("Error : "+JSON.stringify(err,null,2))})

    }else{
        res.send(`{
            "error": {
              "status": 400,
              "code": "DEP_02",
              "message": "Don'exist department with this ID.",
              "field": "department_id"
            }
          }`);
    }
    
})


module.exports=router