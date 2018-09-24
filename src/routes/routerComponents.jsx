import Loadable from 'react-loadable'
import { deferredAsyncConnect } from '../utils/deferredAsyncConnect'

const Loading = () => null

let Topics
let Detail

// 做路由懒加载时会打包出多份bundle，在development模式下打包node端运行的代码
// 由于是打包在内存中，会出现找不到模块的问题，可以考虑打包到硬盘但是这样显然效率较低
// 所以这里就单独为开发时打包服务端渲染bundle，提供一份同步的路由
if (process.env.isServer && process.env.NODE_ENV === 'development') {
    /* eslint-disable */
    Topics = require('../containers/topics').default
    Detail = require('../containers/detail').default
    /* eslint-enable */
} else {
    Topics = Loadable({
        loader: () => import(/* webpackChunkName: 'page-topics' */ '../containers/topics'),
        loading: Loading
    })

    Detail = Loadable({
        loader: () => import(/* webpackChunkName: 'page-detail' */ '../containers/detail'),
        loading: Loading
    })
}

Topics = deferredAsyncConnect(Topics)({
    promise: ({ store }) => store.dispatch.topics.getTopics()
})

Detail = deferredAsyncConnect(Detail)({
    promise: ({ store, match }) => store.dispatch.detail.getTopicById(match.params.id)
})

export default {
    Topics,
    Detail
}
