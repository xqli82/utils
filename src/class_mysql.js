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
                return console.log('fail connect:', err)
            }
            this.status.connect = true
        })
        this.conn.on('error', err => {
            console.log('db error', err);
            console.log('3秒后重连')
            // 如果是连接断开，自动重新连接
            if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                this.status.connect = false
                setTimeout(() => {
                    if(!this.status.connect) this.connect()
                }, 3000);
            } else {
                throw err;
            }
        })
    }
    query(str) {
        return new Promise((resolve, reject) => {
            this.conn.query(str, (err, results) => {
                if (!this.status.connect) {
                    this.connect()
                    reject('已经断开连接')
                }
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