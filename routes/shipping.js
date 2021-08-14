const express = require('express')
const router = express.Router()

const {getShippingRegions,getShippingRegionsByShippingRegionsId}=require('../controller/shipping.js')

router.get('/shipping/regions',getShippingRegions)
router.get('/shipping/regions/:shipping_region_id',getShippingRegionsByShippingRegionsId)

module.exports=router