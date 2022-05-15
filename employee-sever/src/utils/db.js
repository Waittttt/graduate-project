const mysql = require('mysql')

const config = {
    database: 'project',
    user: 'root',
    password: '123456'
}

exports.db = (sql, sqlParams) => {
    sqlParams = sqlParams || []
    return new Promise((resolve, reject) => {
        const pool = mysql.createPool(config)
        pool.getConnection((err, conn) => {
            if (!err) {
                conn.query(sql, sqlParams, (e, result) => {
                    if (!e) {
                        console.log(result)
                        resolve(result)
                        conn.destroy()
                    } else {
                        reject(result)
                    }
                })
            } else {
                console.log('数据库连接失败', err)
                reject(err)
            }
        })
    })
}