const knex=require('../config/db.connection.js')

const getAttributes=async(req,res)=>{
    await knex.from('attribute').select('*').then((data)=>{
        return res.status(200).send(data)})
    .catch((err) => {
        return res.status(400).json({message: err,status: 404})})
}

const getAttributesById = async (req, res) => {
    await knex.from('attribute').select('*').where('attribute_id',req.params.attribute_id)
    .then((data)=>{
        return (data.length == 0) ? res.status(400).json({message:"Do Not Exist Attributes With This ID",status:400}):res.status(200).send(data[0])})
    .catch((err) => {
        return res.status(400).json({ message: err, status: 404 })})
}

const getAttributesValueById=async(req,res)=>{
    await knex.from('attribute').select('attribute_value.attribute_value_id','attribute_value.value')
    .join('attribute_value','attribute.attribute_id','=','attribute_value.attribute_id')
    .where('attribute_value.attribute_id',req.params.attribute_id)
    .then((data)=>{
        return (data.length == 0) ? res.status(400).json({message:"Do Not Exist Attributes With This ID",status:400}):res.status(200).send(data)})
    .catch((err) => {
        return res.status(400).json({ message: err, status: 404 })})
}


const getAttributesByProductId=async(req,res)=>{
    await knex.from('attribute').select('attribute.name','attribute_value.attribute_value_id','attribute_value.value')
    .join('attribute_value','attribute_value.attribute_id','=','attribute.attribute_id')
    .join('product_attribute','product_attribute.attribute_value_id','=','attribute_value.attribute_value_id')
    .where('product_attribute.product_id',req.params.product_id)
    .then((data)=>{
        return (data.length == 0) ? res.status(400).json({message:"Do Not Exist Attributes With This ID",status:400}):res.status(200).send(data)})
    .catch((err)=>{
        return res.status(400).json({ message: err, status: 404 })})
}


module.exports={getAttributes,getAttributesById,getAttributesValueById,getAttributesByProductId}