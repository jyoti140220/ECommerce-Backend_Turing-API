const knex=require('../config/db.connection.js')
// const { param } = require('../routes/product.js')

exports.getProduct=async(req,res)=>{
    await knex.from('product').select('*')
    .limit(5).offset(6)
    .then((data)=>{
        var data1=data.map((item)=>{
            if (item['description'].length>1){
                var description=item['description'].slice(0,3)
                return ({...item,description})}})
        return res.status(200).json({count:101,rows:data1})})
    .catch((err)=>{
        return res.status(400).json({ message: err, status: 404 })})
}


exports.getproductBySearch = async (req, res) => {
    var search = req.query.search;
    await knex.from('product').select('product_id','name','description','price','discounted_price','thumbnail')
    .where('name', 'like', `%${search}%`)
    .orWhere('description', 'like', `%${search}%`).then((data)=>{
        return res.status(200).json({count:data.length,rows:data})
    .catch((err)=>{
        return res.status(400).json({message: err,status: 404})})  

    })
}

exports.getProductById=async(req,res)=>{
    await knex.from('product').select('*').where('product_id',req.params.product_id)
    .then((data)=>{
        return (data.length == 0) ? res.status(400).json({message:"Do Not Exist Product  With This ID",status:400}):res.status(200).send(data[0]);})
    .catch((err) => {
        return res.status(400).json({message: err,status: 404})})
}

exports.getProductByCategoryId=async(req,res)=>{
    await knex.from('product').select('product.product_id','name','description','price','discounted_price','thumbnail')
    .join('product_category','product_category.product_id','=','product.product_id')
    .where('product_category.category_id',req.params.category_id)
    .then((data)=>{
        return res.status(200).json({count:data.length,rows:data})
    }).catch((err)=>{
        return res.status(400).json({message: err,status: 404})})
}


exports.getProductByDepartmentId=async(req,res)=>{
    await knex.distinct().from('product').select('product.product_id','product.name','product.description','product.price','product.discounted_price','product.thumbnail')
    .join('product_category','product_category.product_id','=','product.product_id')
    .join('category','category.category_id','=','product_category.category_id')
    .where('category.department_id',req.params.department_id)
    .then((data)=>{
        return res.status(200).json({count:data.length,rows:data})
    }).catch((err)=>{
        return res.status(400).json({message: err,status: 404})})
}

exports.getProductDetialsByProductId=async(req,res)=>{
    await knex.from('product').select('product_id','name','description','price','discounted_price','image','image_2')
    .where('product_id',req.params.product_id).then((data)=>{
        return (data.length == 0) ? res.status(400).json({message:"Do Not Exist Product Detials With This ID",status:400}):res.status(200).send(data);
    }).catch((err)=>{
        return res.status(400).json({message: err,status: 404})})  
}

exports.getProductLocationByProductId=async(req,res)=>{
    await knex.from('product').select('category.category_id','category.name as category_name','category.department_id','department.name as department_name')
    .join('product_category','product.product_id','=','product_category.product_id')
    .join('category','category.category_id','=','product_category.category_id')
    .join('department','department.department_id','=','category.department_id')
    .where('product.product_id',req.params.product_id)
    .then((data)=>{
        return (data.length == 0) ? res.status(400).json({message:"Do Not Exist Product Location With This ID",status:400}):res.status(200).send(data);
    }).catch((err)=>{
        return res.status(400).json({message: err,status: 404})})  
}

exports.getProductReviewsByProductId=async(req,res)=>{
    await knex.from('review').select('product.name', 'review.review', 'review.rating', 'review.created_on')
    .join('product', 'review.product_id', 'product.product_id')
    .where('product.product_id', req.params.product_id)
    .then((data) => {
        return (data.length == 0) ? res.status(400).json({message:"Do Not Exist Product Location With This ID",status:400}):res.status(200).send(data);
    }).catch((err) => {
        return res.status(400).json({message: err,status: 404})})  
}


exports.createPostReviews=async(req,res)=>{
    await knex.from('review').insert({review: req.body.review, rating: req.body.rating, created_on: new Date(), customer_id: "1",product_id: req.params.product_id})
    .where('product.product_id', req.params.product_id)
    .then((data) => {
        return res.status(200).json({message:"Create Succesfully!!!",status:200})})
    .catch((err) => {
        return res.status(400).json({message: err,status: 404})})  
}


