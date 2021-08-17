const express=require('express')
const router=express.Router()

const {createOrders,getOrdersByOrderId,getOrderByCustomer,getSortDetialsByOrderId}=require('../controller/orders.js')

router.post('/orders/:id',createOrders)
router.get('/order/:order_id',getOrdersByOrderId)
router.get('/orders/incustomer',getOrderByCustomer)
router.get('/orders/sortdetials/:order_id',getSortDetialsByOrderId)


module.exports=router