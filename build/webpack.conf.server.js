const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path')
const nodeExternals = require('webpack-node-externals')
const base = require('./webpack.conf.base')
const config = require('./config')

const r = dir => path.resolve(__dirname, '..', dir)

module.exports = merge(base, {
    mode: process.env.NODE_ENV || 'development',
    target: 'node',
    entry: {
        app: './src/entry-server.js'
    },
    output: {
        filename: 'server.bundle.js',
        path: r('dist'),
        publicPath: process.env.NODE_ENV === 'development' ? config.dev.publicPath : config.prod.publicPath,
        libraryTarget: 'commonjs2',
        chunkFilename: 'server/[name].js'
    },
    externals: [nodeExternals({
        // 配置需要经过webpack处理才能在服务端运行的模块
        whitelist: [/\.css$/]
    })],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: {
                    loader: 'babel-loader'
                },
                include: r('src')
            },
            {
                test: /\.(css|styl)$/,
                loader: 'ignore-loader'
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                isClient: 'false',
                isServer: 'true',
                HOST: JSON.stringify(process.env.HOST),
                PORT: JSON.stringify(process.env.PORT)
            }
        })
    ]
})
