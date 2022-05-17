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
    getAll: async() => {
        const sql = 'select * from user'
        return await db(sql, [])
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
    },
    editUser: async(form) => {
        console.log('form', form)
        const { id, ...values } = form
        console.log(values)
        const sql = 'UPDATE user SET ? where id = ?'
        const sqlParams = [values, id]
        console.log('params', sqlParams)
        return await db(sql, sqlParams)
    }
}

module.exports.user = user
