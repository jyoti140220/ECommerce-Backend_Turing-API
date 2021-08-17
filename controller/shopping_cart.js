const knex=require('../config/db.connection.js')

const genrateUniqueId =async(req,res) => {
    const cart_id =Math.random().toString(36).slice(2)
    return res.status(200).json({cart_id:cart_id})
}

const addProductInCart=async(req,res)=>{
    const cart_data = {cart_id: req.body.cart_id,product_id: req.body.product_id,attributes: req.body.attributes,quantity: 1,added_on: new Date()}
    await knex.from('shopping_cart').insert(cart_data).then(()=>{
        return res.status(200).json({message:"Product Added In A Cart Successfully!!!",status:200})
    }).catch((err)=>{
        return res.status(400).json({message: err,status: 404})})   
}

const getShoppingCartById=async(req,res)=>{
    await knex.from('shopping_cart').select('shopping_cart.item_id','product.name','shopping_cart.attributes','product.product_id','product.image','product.price','shopping_cart.quantity')
    .join('attribute_value','attribute_value.attribute_id','=','shopping_cart.item_id')
    .join('product_attribute','product_attribute.attribute_value_id','=','attribute_value.attribute_value_id')
    .join('product','product.product_id','=','product_attribute.product_id')
    .where('shopping_cart.cart_id',req.params.cart_id)
    .then((data)=>{
        return (data.length == 0) ? res.status(400).json({message:"Do Not Exist Data With This ID",status:400}):res.status(200).send(data[0])})
    .catch((err)=>{
        return res.status(400).json({message: err,status: 404})})
}

const updateCartByItem=async(req,res)=>{
    await knex.from('shopping_cart').update({quantity:req.body.quantity}).where('item_id',req.params.item_id)
    .then(()=>{
        knex.from('shopping_cart').select('*').then((data)=>{
            return res.status(200).send(data)}).catch((err)=>{
            return res.status(400).json({message: err,status: 404})})
        })
    .catch((err)=>{
        return res.status(400).json({message: err,status: 404})})
}

const deleteCartByCart_Id=async(req,res)=>{
    await knex.from('shopping_cart').where('cart_id',req.params.cart_id).del().then(()=>{
        return res.status(200).json({message:"Cart is deleted..",status:200})
    }).catch((err)=>{
        return res.status(400).json({message: err,status: 404})})
}

const moveProductToCart=async(req,res)=>{
    await knex.schema.createTableIfNotExists('cart', function (table) {
        table.increments('item_id').primary();
        table.string('cart_id');
        table.integer('product_id');
        table.string('attributes');
        table.integer('quantity');
        table.integer('buy_now');
        table.datetime('added_on');
    }).then(()=>{console.log("Table Created...")}).catch((err)=>{console.log(err)})
    knex.from('shopping_cart').select('*').where('item_id',req.params.item_id)
    .then((data)=>{
        if(data.length==0){
            return res.status(400).json({message:"Do Not Exist Data With This ID",status:400})
        }
        knex.from('cart').insert(data).then((result)=>{
            return res.status(200).json({message:"data move from shopping_cart to cart successfully!",status:200});
        }).catch((err)=>{
            return res.status(400).json({message: err,status: 404})})
    }).catch((err)=>{
        return res.status(400).json({message: err,status: 404})})
}



const getTotalAmountByCartId=async(req,res)=>{
    await knex.from('shopping_cart').select('quantity','price')
    .join('product','shopping_cart.product_id','=','product.product_id')
    .where('shopping_cart.cart_id', req.params.cart_id).then((data)=>{
        if(data.length==0){
            return res.status(400).json({message:"Do Not Exist Data With This ID",status:400})
        }
        let total_Amount;
        for (let i of data) {
            total_Amount = i.quantity * i.price; 
        }
        return res.status(200).json({total_Amount:total_Amount});
    }).catch((err)=>{
        return res.status(400).json({message: err,status: 404})})
}

const saveForLaterInLaterTB=async(req,res)=>{
    await knex.schema.createTableIfNotExists('later', function (table) {
        table.increments('item_id').primary();
        table.string('cart_id');
        table.integer('product_id');
        table.string('attributes');
        table.integer('quantity');
        table.integer('buy_now');
        table.datetime('added_on');
    }).then(()=>{console.log("Table Created...")}).catch((err)=>{console.log(err)})
    knex.from('shopping_cart').select('*').where('item_id',req.params.item_id)
    .then((data)=>{
        if(data.length==0){
            return res.status(400).json({message:"Do Not Exist Data With This ID",status:400})
        }
        knex.from('later').insert(data).then((result)=>{
            return res.status(200).json({message:"data move from shopping_cart to later table successfully!",status:200});
        }).catch((err)=>{
            return res.status(400).json({message: err,status: 404})})
    }).catch((err)=>{
        return res.status(400).json({message: err,status: 404})})
}


const getSavedFromLaterTable=async(req,res)=>{
    await knex.from('later').select('*').then((data) => {
        return res.status(200).send(data)})
    .catch((err) => {
        return res.status(400).json({message: err,status: 404})})
}

const removeProductInCart=async(req,res)=>{
    await knex.from('later').where('item_id',req.params.item_id).del().then(()=>{
        return res.status(200).json({message:"Data Deleted Succesfully!!!",status: 200})
    }).catch((err)=>{
        return res.status(400).json({message: err,status: 404})})
}


module.exports={genrateUniqueId,addProductInCart,getShoppingCartById,updateCartByItem,deleteCartByCart_Id,moveProductToCart,getTotalAmountByCartId,saveForLaterInLaterTB,getSavedFromLaterTable,removeProductInCart}



