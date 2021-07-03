const knex=require('knex')({
    client:'mysql',
    connection:{
        host:"localhost",
        user:"root",
        password:"Jyoti34@12",
        database:"tshirtshop"
    }
})

module.exports=knex