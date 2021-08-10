const knex=require('../config/db.connection.js')

exports.getAttributes=async(req,res)=>{
    await knex.from('attribute').select('*').then((data)=>{
        return res.status(200).send(data)})
        .catch((err) => {
            return res.status(400).json({message: err,status: 404})})
}