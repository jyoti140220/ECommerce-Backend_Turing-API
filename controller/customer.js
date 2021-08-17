const knex=require('../config/db.connection.js')
const {createToken,varifyToken}=require('../middleware/jwt.js')


const customerRegister=async(req,res)=>{
    const userdata = {name: req.body.name,email: req.body.email,password: req.body.password}
    await knex.from('customer').insert(userdata).then(()=>{
        return res.status(200).json({Message:"You Have Registered Customer Sucessfully!!!",status:200})
    }).catch((err)=>{
        return res.status(400).send(err)})       
}


const customerLogin=async(req,res)=>{
    await knex.from('customer').select('*').where('email',req.body.email).where('password',req.body.password).then((data)=>{
        if (Object.keys(data).length==0){
            return res.status(404).json({message: "Invalid Email-Id Or Password",status: 404})
        }else{
            const token= createToken({email:req.body.email},process.env.SECRET_KEY,{expiresIn: '24h' })
            res.cookie('token', token)
            return res.status(200).json({customer:data[0],accessToken:token})
        } 
    }).catch((err)=>{
        return res.status(400).json({message: err,status: 404})})  
}

const getCustomerById=async(req,res)=>{
    await knex.from('customer').select('*').where('customer_id',req.params.customer_id)
    .then((data) => {
        return (data.length == 0) ? res.status(400).json({message:"Do Not Exist Customer With This ID",status:400}):res.status(200).send(data[0]);
    }).catch((err) => {
        return res.status(400).json({message: err,status: 404})})   
}

const updateCustomerDetialsById=async(req,res,next)=>{
    await knex.from('customer').update({name:req.body.name,email:req.body.email,password:req.body.password}).where('customer_id',req.params.customer_id)
    .then((data)=>{
        return res.status(200).json({Message:"Data Update",status:200})
    }).catch((err)=>{
        return res.status(400).json({message: err,status: 404})})   
}

const updateAddressById=async(req,res)=>{
    await knex.from('customer').update({country:req.body.country,region:req.body.region,city:req.body.city}).where('customer_id',req.params.customer_id)
    .then((data)=>{
        return res.status(200).json({Message:"Address Update",status:200})
    }).catch((err)=>{
        return res.status(400).json({message: err,status: 404})})   
}


const updateCreditCardById=async(req,res)=>{
    await knex.from('customer').update({credit_card:req.body.credit_card}).where('customer_id',req.params.customer_id)
    .then((data)=>{
        return res.status(200).json({Message:"Credit-Card Update",status:200})
    }).catch((err)=>{
        return res.status(400).json({message: err,status: 404})})   
}

module.exports={customerRegister,customerLogin,getCustomerById,updateCustomerDetialsById,updateAddressById,updateCreditCardById}