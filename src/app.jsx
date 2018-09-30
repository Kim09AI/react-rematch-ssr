import React from 'react'
import { Link } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import PropTypes from 'prop-types'
import ProgressBar from './components/progressBar'
import './app.css'

export default function App(props) {
    const { route } = props

    return (
        <div styleName="app">
            <ProgressBar />
            <nav styleName="nav">
                <Link to="/topics">topics</Link>
            </nav>
            {renderRoutes(route.routes)}
        </div>
    )
}

App.propTypes = {
    route: PropTypes.object.isRequired
}
