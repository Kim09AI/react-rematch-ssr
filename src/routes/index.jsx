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
            // 原本只需要<Redirect to={`/user/${props.match.params.id}`} />即可
            // 这样处理是因为搭配了redux-connect，路由是异步切换的
            // 在切换完成之前props的变化会导致重复渲染本组件，即重复Redirect导致报错
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
