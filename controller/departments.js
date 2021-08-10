const knex = require('../config/db.connection.js')

const getDepartment = async (req, res) => {
    await knex.from('department').select('*').then((data) => {
        return res.status(200).send(data)})
    .catch((err) => {
        return res.status(400).json({message: err,status: 404})})
}


const getDepartmentById = async (req, res) => {
    await knex.from('department').select('*').where('department_id', req.params.department_id)
        .then((data) => {
            if (data.length == 0) {
                return res.status(400).json({message:"Do Not Exist Department With This ID",status:400})
            } else {
                return res.status(200).send(data[0])
            }})
        .catch((err) => {
            return res.status(400).json({message: err,status: 404})})
        
}


module.exports = { getDepartment, getDepartmentById }