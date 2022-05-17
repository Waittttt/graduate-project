/* eslint-disable space-before-function-paren */
const express = require('express')
const { user } = require('./server/user')
const { work } = require('./server/work')
const { attendance } = require('./server/attendance')
const { device } = require('./server/device')
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

app.get('/user', async(req, res) => {
    const result = await user.getAll()

    res.send({ code: 200, msg: '请求成功', data: result })
})

app.get('/user/:id', async(req, res) => {
    const result = await user.getUserById(req.params.id)

    res.send({ code: 200, msg: '请求成功', data: result })
})

app.post('/user/auth', async(req, res) => {
    let json = null
    req.on('data', (chunk) => {
        const str = Buffer.from(chunk).toString()
        json = JSON.parse(str)
    })
    req.on('end', async() => {
        const result = await user.editUser(json)
        console.log('result', result)
        res.send(result)
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
    let json = null
    req.on('data', (chunk) => {
        const str = Buffer.from(chunk).toString()
        json = JSON.parse(str)
    })
    req.on('end', async() => {
        const result = await attendance.edit(json)
        console.log('result', result)
        res.send(result)
    })
})

app.get('/work', async(req, res) => {
    const { user_id: userId, type } = req.query
    const result = await work.getAll(userId, type)
        // const user1 = await user.getUserById(userId)
        // result.forEach(item => {
        //     item.username = user1[0].username
        // })
        // console.log(result)

    res.send({
        code: 200,
        msg: '请求成功',
        data: result
    })
})

app.get('/work/:id', async(req, res) => {
    const result = await work.getWorkById(req.params.id)

    res.send({
        code: 200,
        msg: '请求成功',
        data: result
    })
})

app.post('/addWork', (req, res) => {
    let json = null
    req.on('data', (chunk) => {
        const str = Buffer.from(chunk).toString()
        json = JSON.parse(str)
    })
    req.on('end', async() => {
        const result = await work.add(json)
        console.log('result', result)
        res.send(result)
    })
})

app.post('/editWork', (req, res) => {
    let json = null
    req.on('data', (chunk) => {
        const str = Buffer.from(chunk).toString()
        json = JSON.parse(str)
    })
    req.on('end', async() => {
        const result = await work.editWork(json)
        console.log('result', result)
        res.send(result)
    })
})

app.post('/deleteWork', (req, res) => {
    let json = null
    req.on('data', (chunk) => {
        const str = Buffer.from(chunk).toString()
        json = JSON.parse(str)
    })
    req.on('end', async() => {
        const result = await work.deleteWork(json)
        console.log('result', result)
        res.send(result)
    })
})

app.get('/device', async(req, res) => {
    const { user_id: userId, num, name } = req.query
    const result = await device.getAll(userId, num, name)
        // const user1 = await user.getUserById(userId)
        // result.forEach(item => {
        //     item.username = user1[0].username
        // })
        // console.log(result)

    res.send({
        code: 200,
        msg: '请求成功',
        data: result
    })
})

app.get('/device/:id', async(req, res) => {
    const result = await device.getDeviceById(req.params.id)

    res.send({
        code: 200,
        msg: '请求成功',
        data: result
    })
})

app.post('/addDevice', (req, res) => {
    let json = null
    req.on('data', (chunk) => {
        const str = Buffer.from(chunk).toString()
        json = JSON.parse(str)
    })
    req.on('end', async() => {
        const result = await device.add(json)
        console.log('result', result)
        res.send(result)
    })
})

app.post('/deleteDevice', (req, res) => {
    let json = null
    req.on('data', (chunk) => {
        const str = Buffer.from(chunk).toString()
        json = JSON.parse(str)
    })
    req.on('end', async() => {
        const result = await device.deleteDevice(json)
        console.log('result', result)
        res.send(result)
    })
})

app.post('/editDevice', (req, res) => {
    let json = null
    req.on('data', (chunk) => {
        const str = Buffer.from(chunk).toString()
        json = JSON.parse(str)
    })
    req.on('end', async() => {
        const result = await device.editDevice(json)
        console.log('result', result)
        res.send(result)
    })
})

app.get('/welcome', async(req, res) => {
    console.log(req.query)
    const r1 = await attendance.getAll(req.query.id)
    const r2 = await work.getAll(req.query.id)
    const r3 = await device.getAll(req.query.id)

    const result = { attendance: r1.length, work: r2.length, device: r3.length }

    res.send({ code: 200, msg: '请求成功', data: result })
})

app.listen(PORT, () => {
    console.log(`server is running in ${PORT}`)
})
