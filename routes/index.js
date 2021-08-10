const express=require('express')
const router=express.Router()

router.use('/',require('./departments.js'))
router.use('/',require('./categories.js'))
router.use('/',require('./attributes.js'))


module.exports=router