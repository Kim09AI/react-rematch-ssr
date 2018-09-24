import React from 'react'
import { Link } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import PropTypes from 'prop-types'

export default function App(props) {
    const { route } = props

    return (
        <div>
            <nav>
                <Link to="/topics">topics</Link>
            </nav>
            {renderRoutes(route.routes)}
        </div>
    )
}

App.propTypes = {
    route: PropTypes.object.isRequired
}
