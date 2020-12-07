const mysql = require('mysql')

class class_mysql {
    constructor(args) {
        this.host = args.host || 'localhost'
        this.port = args.port || 3306
        this.user = args.user || 'root'
        this.password = args.password
        this.database = args.database || 'mysql',
            this.conn = undefined
        this.status = {}
        this.connect()
    }
    connect() {
        this.conn = mysql.createConnection({
            host: this.host,
            port: this.port,
            user: this.user,
            password: this.password,
            database: this.database
        })
        this.conn.connect(err => {
            if (err) {
                return this.errHandle(err)
            }
            console.log('连接成功')
            this.status.connect = true
        })
        this.conn.on('error',err=>this.errHandle(err))
    }
    errHandle(err){
        console.log('db error', err);  
        // 如果是连接断开，自动重新连接
        if (err.code === 'ECONNRESET') {
            console.log('3秒后重连')
            this.status.connect = false         
        } else {
            console.log(err)
        }
        setTimeout(() => {
            console.log('重新尝试连接')
            if(!this.status.connect) this.connect()
        }, 3000);
    }
    query(str) {
        return new Promise((resolve, reject) => {
            this.conn.query(str, (err, results) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(JSON.stringify(results))
                }
            })
        })
    }
}

module.exports = class_mysql