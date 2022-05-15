/* eslint-disable space-before-function-paren */
const express = require('express')
const { user } = require('./server/user')
const { attendance } = require('./server/attendance')
    // const { db } = require('./utils/db')

const app = express()

const PORT = 3000

app.use(require('cors')())

app.post('/login', (req, res) => {
    let json = null
    req.on('data', (chunk) => {
        const str = Buffer.from(chunk).toString()
        json = JSON.parse(str)
    })
    req.on('end', async() => {
        console.log('json:', json)
        const u = await user.userLogin(json)
        if (u !== null) {
            res.send({ code: 200, msg: '登陆成功', data: u })
        } else {
            res.send({ code: 500, msg: '用户名或密码错误', data: null })
        }
        console.log('getuser', u)
    })
})

app.get('/attendance', async(req, res) => {
    // console.log(req.query)
    // req.on('data', () => {})
    // req.on('end', async() => {
    //     const result = await attendance.getAll(req.query.user_id)
    //     console.log('result', result)
    //     res.send({
    //         code: 200,
    //         msg: '请求成功',
    //         data: result
    //     })
    // })
    // const userId = req.query.user_id
    // const reason =
    const { user_id: userId, reason } = req.query
    const result = await attendance.getAll(userId, reason)
    const user1 = await user.getUserById(userId)
    result.forEach(item => {
        item.username = user1[0].username
    })
    console.log(result)

    res.send({
        code: 200,
        msg: '请求成功',
        data: result
    })
})

app.post('/addAttendance', (req, res) => {
    let json = null
    req.on('data', (chunk) => {
        const str = Buffer.from(chunk).toString()
        json = JSON.parse(str)
    })
    req.on('end', async() => {
        const result = await attendance.add(json)
        console.log('result', result)
        res.send(result)
    })
})

app.post('/deleteAttendance', (req, res) => {
    let json = null
    req.on('data', (chunk) => {
        const str = Buffer.from(chunk).toString()
        json = JSON.parse(str)
    })
    req.on('end', async() => {
        const result = await attendance.delete(json)
        console.log('result', result)
        res.send(result)
    })
})

app.post('/editAttendance', (req, res) => {

})

app.listen(PORT, () => {
    console.log(`server is running in ${PORT}`)
})