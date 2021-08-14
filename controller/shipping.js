const knex=require('../config/db.connection.js')

exports.getShippingRegions=async(req,res)=>{
    await knex.from('shipping_region').select('*').then((data)=>{
        return res.status(200).send(data)})
    .catch((err)=>{
        return res.status(400).json({message: err,status: 404})})
}


exports.getShippingRegionsByShippingRegionsId=async(req,res)=>{
    await knex.from('shipping').select('*').where('shipping_region_id',req.params.shipping_region_id)
    .then((data)=>{
        return (data.length == 0) ? res.status(400).json({message:"Do Not Exist Shipping Regions With This ID",status:400}):res.status(200).send(data)})
    .catch((err)=>{
        return res.status(400).json({message: err,status: 404})})
}


