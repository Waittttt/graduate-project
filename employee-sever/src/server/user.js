/* eslint-disable space-before-function-paren */
const { db } = require('../utils/db')
    // const crypto = require('crypto')

const user = {
    getUserByName: async(username) => {
        const sql = 'select * from user where username = ? '
        return await db(sql, [username])
    },
    getUserById: async(id) => {
        const sql = 'select * from user where id = ?'
        return await db(sql, [id])
    },
    getAll: () => {

    },
    userLogin: async(json) => {
        const users = await user.getUserByName(json.username)
        if (users.length > 0) {
            const u = users[0]
                // const enpwd = crypto.createHash('md5').update(json.password + json.username).digest('hex')
                // console.log('expwd', enpwd)
            if (u.password === json.password) {
                return u
            }
        }
        return await null
    }
}

module.exports.user = user