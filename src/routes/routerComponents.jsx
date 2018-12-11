import loadable from '../components/loadable'
import { deferredAsyncConnect } from '../utils/deferredAsyncConnect'

const Topics = loadable(() => import(/* webpackChunkName: 'page-topics' */ '../containers/topics'))
const Detail = loadable(() => import(/* webpackChunkName: 'page-detail' */ '../containers/detail'))

export default {
    Topics: deferredAsyncConnect(Topics)({
        promise: ({ store }) => store.dispatch.topics.getTopics()
    }),
    Detail: deferredAsyncConnect(Detail)({
        promise: ({ store, match }) => store.dispatch.detail.getTopicById(match.params.id)
    })
}
