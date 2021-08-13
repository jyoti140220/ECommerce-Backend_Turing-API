const express=require('express')
const router=express()

const {getAttributes,getAttributesById,getAttributesValueById,getAttributesByProductId}=require('../controller/attributes.js')

router.get('/attributes',getAttributes)
router.get('/attributes/:attribute_id',getAttributesById)
router.get('/attributes/values/:attribute_id',getAttributesValueById)
router.get('/attributes/inproduct/:product_id',getAttributesByProductId)


module.exports=router