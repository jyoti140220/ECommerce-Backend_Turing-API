const express = require('express')
const router = express.Router()

const { getDepartment, getDepartmentById } = require('../controller/departments.js')

router.get('/department', getDepartment)
router.get('/department/:department_id', getDepartmentById)

module.exports = router






