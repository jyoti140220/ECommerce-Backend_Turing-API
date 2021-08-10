const knex=require('../config/db.connection.js')

exports.getAttributes=async(req,res)=>{
    await knex.from('attribute').select('*').then((data)=>{
        return res.status(200).send(data)})
        .catch((err) => {
            return res.status(400).json({message: err,status: 404})})
}

exports.getAttributesById = async (req, res) => {
    await knex.from('attribute').select('*').where('attribute_id',req.params.attribute_id).then((data)=>{
        if (data.length == 0) {
            return res.status(400).json({ message: "Do Not Exist attributes With This ID", status: 400 })}
        else {
            return res.status(200).send(data[0])}})
        .catch((err) => {
            return res.status(400).json({ message: err, status: 404 })})
}

exports.getAttributesValueById=async(req,res)=>{
    await knex.from('attribute').select('attribute_value.attribute_value_id','attribute_value.value')
    .join('attribute_value','attribute.attribute_id','=','attribute_value.attribute_id')
    .where('attribute_value.attribute_id',req.params.attribute_id)
    .then((data)=>{
        if (data.length == 0) {
            return res.status(400).json({ message: "Do Not Exist Attributes Value With This ID", status: 400 })}
        else {
            return res.status(200).send(data)}})
    .catch((err) => {
        return res.status(400).json({ message: err, status: 404 })})

}