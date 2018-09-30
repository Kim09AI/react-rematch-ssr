const webpack = require('webpack')
const path = require('path')
const MFS = require('memory-fs')
const vm = require('vm')
const NativeModule = require('module')
const axios = require('axios')
const render = require('./render')
const serverConfig = require('../../build/webpack.conf.server')

const getTemplate = () => {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:9000/public/server.ejs')
            .then(res => {
                resolve(res.data)
            })
            .catch(reject)
    })
}

let serverBundle
const complier = webpack(serverConfig)
const mfs = new MFS()
complier.outputFileSystem = mfs
complier.watch({}, (err, stats) => {
    if (err) throw err
    stats = stats.toJson()
    stats.errors.forEach(err => console.error(err))
    stats.warnings.forEach(warn => console.warn(warn))

    let bundlePath = path.resolve(serverConfig.output.path, serverConfig.output.filename)
    let bundle = mfs.readFileSync(bundlePath, 'utf-8')

    const m = { exports: {} }
    // 对打包后的server.bundle.js添加一层wrap
    // 即由 module.exports = 我们的代码 => (function (exports, require, module, __filename, __dirname) { module.exports = 我们的代码 })
    const wrap = NativeModule.wrap(bundle)
    // 把字符串转换成可执行的代码
    const script = new vm.Script(wrap, {
        displayErrors: true,
        filename: 'server.bundle.js'
    })
    // 指定运行环境
    const result = script.runInThisContext()
    // 执行(function (exports, require, module, __filename, __dirname) { module.exports = 我们的代码 })
    // 把代码执行结果挂载到module.exports上
    try {
        result.call(m.exports, m.exports, require, m)
    } catch (err) {}
    serverBundle = m.exports
})

module.exports = function devRender(req, res, next) {
    if (!serverBundle) {
        return res.send('waiting for compile, refresh later!')
    }
    getTemplate()
        .then(template => {
            render(template, serverBundle, req, res, next)
        })
        .catch(next)
}
