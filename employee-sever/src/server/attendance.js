/* eslint-disable object-curly-spacing */
/* eslint-disable space-before-function-paren */
const { db } = require('../utils/db')

const attendance = {
    add: async(form) => {
        // const sql = 'INSERT INTO'
        console.log('form', form)
        const all = await attendance.getAll(form.user_id)
        console.log('all', all)
        const length = all.length
        const id = all[length - 1] ? +all[length - 1].id + 1 : length + 1
        const sql = 'INSERT INTO attendance SET ?'
        const sqlParams = [{ id: id.toString(), ...form }]
        console.log('params', sqlParams)
        return await db(sql, sqlParams)
    },
    getAll: async(userid, reason) => {
        console.log('usr=id', userid)
        let sql = 'select * from attendance where user_id = ?'
        const sqlParams = [userid]
        if (reason) {
            sql += 'and reason = ?'
            sqlParams.push(reason)
        }
        return await db(sql, sqlParams)
    },
    edit: async(form) => {

    },
    delete: async(form) => {
        console.log('form', form)
        const sql = 'delete from attendance where id = ?'
        const sqlParams = [form.id]
        return await db(sql, sqlParams)
    }
}

module.exports.attendance = attendance