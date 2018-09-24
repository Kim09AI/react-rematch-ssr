import React from 'react'
import { Redirect } from 'react-router-dom'
import App from '../app'
import routerComponents from './routerComponents'

const routes = [{
    component: App,
    routes: [
        {
            path: '/',
            exact: true,
            component: (props) => props.history.location.pathname === '/' && <Redirect to="/topics" />
        },
        {
            path: '/topics',
            component: routerComponents.Topics
        },
        {
            path: '/detail/:id',
            component: routerComponents.Detail
        },
        {
            path: '*',
            component: () => <div>404 Not Found</div>
        }
    ]
}]

export default routes
