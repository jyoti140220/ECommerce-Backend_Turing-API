const express = require('express')
const router = express.Router()

const {getCategories,getCategoriesById,getCategoriesByProductId,getCategoriesByDepartmentId} = require('../controller/categories.js')

router.get('/categories', getCategories)
router.get('/categories/:category_id',getCategoriesById)
router.get('/categories/inProduct/:product_id',getCategoriesByProductId)
router.get('/categories/inDepartment/:department_id',getCategoriesByDepartmentId)


module.exports = router





