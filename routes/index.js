const express=require('express')
const router=express.Router()

router.use('/',require('./departments.js'))
router.use('/',require('./categories.js'))


module.exports=router