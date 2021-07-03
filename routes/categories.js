const express = require('express');
var router = express()
var router = express.Router()
const knex = require('../connect/connect.js')

router.get('/categories', (req, res) => {
    knex('category').select('*').then(data => {
        var alldata = {
            count: data.length,
            rows: data
        }
        res.send(alldata)
    }).catch(err => { res.send(err) })

})

router.get('/categories/:categories_id',(req,res)=>{
    knex('category').select('*').where('category_id',req.params.categories_id).then(data=>{
        res.send(data)
    }).catch(err=>{res.status(400).send(err)})

})




module.exports = router