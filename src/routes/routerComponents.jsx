import Loadable from 'react-loadable'
import { deferredAsyncConnect } from '../utils/deferredAsyncConnect'

const Loading = () => null

const Topics = Loadable({
    loader: () => import(/* webpackChunkName: 'page-topics' */ '../containers/topics'),
    loading: Loading
})

const Detail = Loadable({
    loader: () => import(/* webpackChunkName: 'page-detail' */ '../containers/detail'),
    loading: Loading
})

export default {
    Topics: deferredAsyncConnect(Topics)({
        promise: ({ store }) => store.dispatch.topics.getTopics()
    }),
    Detail: deferredAsyncConnect(Detail)({
        promise: ({ store, match }) => store.dispatch.detail.getTopicById(match.params.id)
    })
}
