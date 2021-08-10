const express=require('express')
const router=express()

const {getAttributes,getAttributesById,getAttributesValueById}=require('../controller/attributes.js')

router.get('/attributes',getAttributes)
router.get('/attributes/:attribute_id',getAttributesById)
router.get('/attributes/values/:attribute_id',getAttributesValueById)

module.exports=router