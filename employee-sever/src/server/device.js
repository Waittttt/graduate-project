/* eslint-disable space-before-function-paren */
const { db } = require('../utils/db')

const device = {
    add: async(form) => {
        console.log('form', form)
        const all = await device.getAll(form.user_id)
        console.log('all', all)
        const length = all.length
        const id = all[length - 1] ? +all[length - 1].id + 1 : length + 1
        const sql = 'INSERT INTO device SET ?'
        const sqlParams = [{ id: id.toString(), ...form }]
        console.log('params', sqlParams)
        return await db(sql, sqlParams)
    },
    getDeviceById: async(id) => {
        const sql = 'select * from device where id = ?'
        const sqlParams = [id]
        return await db(sql, sqlParams)
    },
    getAll: async(userid, num, name) => {
        console.log('usr=id', userid)
        let sql = 'select * from device where user_id = ?'
        const sqlParams = [userid]
        if (num) {
            sql += 'and num = ?'
            sqlParams.push(num)
        }
        if (name) {
            sql += 'and name = ?'
            sqlParams.push(name)
        }
        return await db(sql, sqlParams)
    },
    editDevice: async(form) => {
        console.log('form', form)
        const { id, ...values } = form
        console.log(values)
        const sql = 'UPDATE device SET ? where id = ?'
        const sqlParams = [values, id]
        console.log('params', sqlParams)
        return await db(sql, sqlParams)
    },
    deleteDevice: async(form) => {
        console.log('form', form)
        const sql = 'delete from device where id = ?'
        const sqlParams = [form.id]
        return await db(sql, sqlParams)
    }
}

module.exports.device = device
