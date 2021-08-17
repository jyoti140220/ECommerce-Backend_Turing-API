const knex=require('../config/db.connection.js')


const createOrders=async(req,res)=>{
    await knex.from('product').select('product.product_id','attribute_value.value','product.name','product.price','product.discounted_price')
    .join('product_attribute','product_attribute.product_id','=','product.product_id')
    .join('attribute_value','attribute_value.attribute_value_id','=','product_attribute.attribute_value_id')
    .where('product.product_id',req.params.id)
    .then((data)=>{
        knex("orders").insert({
            "total_amount": data[0].price * data[0].price,
            "created_on": new Date(),
            "customer_id": req.body.customer_id,
            "shipping_id": req.body.shipping_id,
            "tax_id": req.body.tax_id})
        .then(()=>{
            var userdata={order_id:data[0]['product_id'],product_id:data[0]['product_id'],attributes:data[0]['value'],product_name:data[0]['name'],quantity:data[0]['price'],unit_cost:data[0]['price']+data[0]['discounted_price']}
            knex.from('order_detail').insert(userdata).then(()=>{
                return res.status(200).json({Message:"You Have Created Orders Sucessfully!!!",status:200})})
        .catch((err)=>{
                return res.status(400).json({message: err,status: 404})})
            })   })
    .catch((err)=>{
        return res.status(400).json({message: err,status: 404})})
}


const getOrdersByOrderId=async(req,res)=>{
    await knex.from('order_detail').select('*').where('order_id',req.params.order_id)
    .then((data) => {
        return (data.length == 0) ? res.status(400).json({message:"Do Not Exist Orders With This ID",status:400}):res.status(200).send(data[0]);
    }).catch((err) => {
        return res.status(400).json({message: err,status: 404})})   

}

const getOrderByCustomer=async(req,res)=>{
    await knex.from('orders').select('*').then((data)=>{
        return res.status(200).send(data)})
    .catch((err)=>{
        return res.status(400).json({message: err,status: 404})})
}

const getSortDetialsByOrderId=async(req,res)=>{
    await knex.from('orders').select('orders.order_id','orders.total_amount','orders.created_on','orders.customer_id','orders.shipped_on','order_detail.product_name')
    .join('order_detail','order_detail.item_id','=','orders.order_id')
    .where('orders.order_id',req.params.order_id)
    .then((data)=>{
        return (data.length == 0) ? res.status(400).json({message:"Do Not Exist Orders With This ID",status:400}):res.status(200).send(data[0])})
    .catch((err)=>{
        return res.status(400).json({message: err,status: 404})})     
}

module.exports={createOrders,getOrdersByOrderId,getOrderByCustomer,getSortDetialsByOrderId}