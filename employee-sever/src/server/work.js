/* eslint-disable space-before-function-paren */
const { db } = require('../utils/db')

const work = {
    add: async(form) => {
        console.log('form', form)
        const all = await work.getAll(form.user_id)
        console.log('all', all)
        const length = all.length
        const id = all[length - 1] ? +all[length - 1].id + 1 : length + 1
        const sql = 'INSERT INTO work SET ?'
        const sqlParams = [{ id: id.toString(), ...form }]
        console.log('params', sqlParams)
        return await db(sql, sqlParams)
    },
    getWorkById: async(id) => {
        const sql = 'select * from work where id = ?'
        const sqlParams = [id]
        return await db(sql, sqlParams)
    },
    getAll: async(userid, type) => {
        console.log('usr=id', userid)
        let sql = 'select * from work where user_id = ?'
        const sqlParams = [userid]
        if (type) {
            sql += 'and type = ?'
            sqlParams.push(type)
        }
        return await db(sql, sqlParams)
    },
    editWork: async(form) => {
        console.log('form', form)
        const { id, ...values } = form
        console.log(values)
        const sql = 'UPDATE work SET ? where id = ?'
        const sqlParams = [values, id]
        console.log('params', sqlParams)
        return await db(sql, sqlParams)
    },
    deleteWork: async(form) => {
        console.log('form', form)
        const sql = 'delete from work where id = ?'
        const sqlParams = [form.id]
        return await db(sql, sqlParams)
    }
}

module.exports.work = work
