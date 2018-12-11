const express = require('express')
const path = require('path')

const app = express()

const isDev = process.env.NODE_ENV === 'development'

if (isDev) {
    app.use(express.static(path.resolve(__dirname, '../public')))

    // 代理到webpack-dev-server服务器
    app.use('/public', require('http-proxy-middleware')({
        target: 'http://localhost:9000',
        changeOrigin: true
    }))

    const devRender = require('./ssr/devRender')
    app.get('*', devRender)
} else {
    app.use(express.static(path.resolve(__dirname, '../dist')))

    const prodRender = require('./ssr/prodRender')
    app.get('*', prodRender)
}

app.use((req, res, next) => {
    const err = new Error(req.originalUrl + 'Not Found')
    err.status = 404
    next(err)
})

app.use((err, req, res, next) => {
    const status = err.status || 500
    if (isDev) {
        console.log(err)
        res.status(status).send(err.message)
    } else {
        res.status(status).send('发生未知错误，请稍后重试')
    }
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`server running on http://localhost:${port}`))
