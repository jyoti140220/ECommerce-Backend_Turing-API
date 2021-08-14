const express=require('express')
const router=express.Router()
const {getTaxes,getTaxByTaxId}=require('../controller/tax.js')

router.get('/tax',getTaxes)
router.get('/tax/:tax_id',getTaxByTaxId)


module.exports=router