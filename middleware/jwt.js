const jwt=require('jsonwebtoken')
const createError=require('http-errors')

const createToken = (data,secret_key) => {
    return jwt.sign(data, secret_key)
}

// const varifyToken=(req,res,next)=>{
//     if(!req.headers['authorization']) return next(createError.Unauthorized())
//     const authHeader=req.headers['authorization'].split(' ')
//     const token=authHeader[1]
//     jwt.verify(token,process.env.SECRET_KEY,(err,payload)=>{
//         if (err){
//             return next(createError.Unauthorized())
//         }
//         res.send("varify")
//         req.payload=payload
//         next()
//     })
// }

const varifyToken=(req,res,next)=>{
    if(!req.headers.cookie) return next(createError.Unauthorized())
    const authHeader=req.headers.cookie.split('=')
    const token=authHeader[1]
    jwt.verify(token,process.env.SECRET_KEY,(err,payload)=>{
        if (err){
            return next(createError.Unauthorized())
        }
        console.log("token varify..")
        req.payload=payload
        next()})
}

module.exports={createToken,varifyToken}
