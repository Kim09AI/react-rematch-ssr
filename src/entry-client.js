import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { matchRoutes } from 'react-router-config'
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader' // eslint-disable-line
import Loadable from 'react-loadable'
import { ReduxAsyncConnect } from 'redux-connect'
import createStore from './store'
import routesConfig from './routes'
import api from './api'

const initialState = window.__INITIAL_STATE__ || {} // eslint-disable-line

const helpers = { api }
const store = createStore(initialState)

store.dispatch.api.initApi(api)

const renderApp = (routes) => {
    ReactDOM.hydrate(
        <AppContainer>
            <Provider store={store}>
                <Router>
                    <ReduxAsyncConnect routes={routes} helpers={helpers} />
                </Router>
            </Provider>
        </AppContainer>,
        document.getElementById('root')
    )
}

// eslint-disable-next-line
;(async () => {
    // 预加载当前页面匹配的页面组件
    if (process.env.NODE_ENV === 'development') {
        const matches = matchRoutes(routesConfig, window.location.pathname)
        await Promise.all(matches.map(matched => matched.route.component && matched.route.component.preload && matched.route.component.preload()))
    }

    Loadable.preloadReady().then(() => renderApp(routesConfig))
})()

if (module.hot) {
    // react hot reload
    module.hot.accept('./routes', () => {
        Loadable.preloadReady().then(() => {
            const routerConfig = require('./routes').default // eslint-disable-line
            renderApp(routesConfig)
        })
    })
}
