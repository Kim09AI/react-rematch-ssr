import { init } from '@rematch/core'
import { reducer as reduxAsyncConnect } from 'redux-connect'
import createLoadingPlugin from '@rematch/loading'
import models from '../models'

export default function createStore(initialState) {
    const loading = createLoadingPlugin({ asNumber: true })
    const store = init({
        models,
        redux: {
            reducers: {
                reduxAsyncConnect
            },
            initialState
        },
        plugins: [loading]
    })

    if (module.hot) {
        // store hot reload
        module.hot.accept('../models', () => {
            const nextModels = require('../models').default // eslint-disable-line

            Object.keys(nextModels).forEach(modelKey => {
                store.model({
                    name: modelKey,
                    ...models[modelKey]
                })
            })
        })
    }

    return store
}
