const express = require('express')
const router = express.Router()

const { getDepartment, getDepartmentById } = require('../controller/departments.js')

router.get('/departments', getDepartment)
router.get('/departments/:department_id', getDepartmentById)

module.exports = router






