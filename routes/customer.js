const express=require('express')
const router=express.Router()

const {customerRegister,customerLogin,getCustomerById}=require('../controller/customer.js')

router.post('/customers',customerRegister)
router.post('/customers/login',customerLogin)
router.get('/customer/:customer_id',getCustomerById)


module.exports=router