const mysql = require('mysql')

class class_mysql{
    constructor(args){
        this.conn=mysql.createConnection(args)
        this.conn.connect()
    }
    query(str){
        this.conn.query(str,(err,results)=>{
            if (err) throw err
            console.log(results)
        })
    }
}

module.exports=class_mysql