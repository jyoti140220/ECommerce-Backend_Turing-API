const express = require('express')
const router = express.Router()

const {getProduct,getproductBySearch,getProductById,getProductByCategoryId,getProductByDepartmentId,getProductDetialsByProductId,getProductLocationByProductId,getProductReviewsByProductId,createPostReviews} = require('../controller/product.js')

router.get('/products', getProduct)
router.get('/products/search', getproductBySearch)
router.get('/products/:product_id',getProductById)
router.get('/products/incategory/:category_id',getProductByCategoryId)
router.get('/products/indepartment/:department_id',getProductByDepartmentId)
router.get('/products/:product_id/detials',getProductDetialsByProductId)
router.get('/products/:product_id/locations',getProductLocationByProductId)
router.get('/products/:product_id/reviews',getProductReviewsByProductId)
router.post('/products/:product_id/reviews',createPostReviews)

module.exports = router






