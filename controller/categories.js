const knex = require('../config/db.connection.js')


const getCategories = async (req, res) => {
    await knex.from('category').select('*').then((data) => {
        return res.status(200).json({ count: data.length, rows: data })})
    .catch((err) => {
        return res.status(400).json({ message: err, status: 400 })})
}

const getCategoriesById = async (req, res) => {
    await knex.from('category').select('*').where('category_id', req.params.category_id)
    .then((data) => {
        return (data.length == 0) ? res.status(400).json({message:"Do Not Exist categories With This ID",status:400}):res.status(200).send(data[0])})
    .catch((err) => {
        return res.status(400).json({ message: err, status: 404 })})
}


const getCategoriesByProductId = async (req, res) => {
    await knex.from('category')
        .select('category.category_id', 'category.department_id', 'category.name')
        .join('product_category', 'category.category_id', '=', 'product_category.category_id')
        .where('product_category.product_id', req.params.product_id)
        .then((data) => {
            return (data.length == 0) ? res.status(400).json({message:"Do Not Exist categories With This ID",status:400}):res.status(200).send(data[0])})
        .catch((err) => {
            return res.status(400).json({ message: err, status: 404 })})
}


const getCategoriesByDepartmentId = async (req, res) => {
    await knex.from('category').select('*').where('department_id', req.params.department_id)
    .then((data) => {
        return (data.length == 0) ? res.status(400).json({message:"Do Not Exist categories With This ID",status:400}):res.status(200).send(data)})
    .catch((err) => {
        return res.status(400).json({ message: err, status: 404 })})
}

module.exports={getCategories,getCategoriesById,getCategoriesByProductId,getCategoriesByDepartmentId}