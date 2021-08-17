const express=require('express')
const router=express.Router()
const {varifyToken}=require('../middleware/jwt.js')


const {customerRegister,customerLogin,getCustomerById,updateCustomerDetialsById,updateAddressById,updateCreditCardById}=require('../controller/customer.js')

router.post('/customers',customerRegister)
router.post('/customers/login',customerLogin)
router.get('/customers/:customer_id',getCustomerById)
router.put('/customers/:customer_id',varifyToken,updateCustomerDetialsById)
router.put('/customers/creditcard/:customer_id',varifyToken,updateCreditCardById)
router.put('/customers/address/:customer_id',varifyToken,updateAddressById)

module.exports=router