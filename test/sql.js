const mysql1 = require('../src/class_mysql')

const sql=new mysql1({
    user:'root',
    password:'test123',
    database:'wp1'
})

setInterval(async () => {
    try{
        let data=await sql.query('select user_pass,user_status from wp_users')
        console.log(data)
    }catch(err){
        console.log(err)
    }
    
}, 5000);

process.on('uncaughtException',err=>{
    console.log(err)
})