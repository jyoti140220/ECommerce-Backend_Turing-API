const knex=require('../config/db.connection.js')

exports.getTaxes=async(req,res)=>{
    await knex('tax').select('*').then((data)=>{
        return res.status(200).send(data)})
    .catch((err)=>{
        return res.status(400).json({message: err,status: 404})})
}


exports.getTaxByTaxId=async(req,res)=>{
    await knex('tax').select('*').where('tax_id',req.params.tax_id)
    .then((data)=>{
        return (data.length == 0) ? res.status(400).json({message:"Do Not Exist Tax With This ID",status:400}):res.status(200).send(data)})
    .catch((err)=>{
        return res.status(400).json({message: err,status: 404})})
}