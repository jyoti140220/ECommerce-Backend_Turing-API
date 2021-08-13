const express=require('express')
const router=express.Router()

router.use('/',require('./departments.js'))
router.use('/',require('./categories.js'))
router.use('/',require('./attributes.js'))
router.use('/',require('./product.js'))


module.exports=router