import React from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import './style.css'

const mapState = state => ({
    topics: state.topics
})

@connect(mapState)
export default class Topics extends React.Component {
    static propTypes = {
        topics: PropTypes.array.isRequired,
        history: PropTypes.object.isRequired
    }

    handleClick(id) {
        this.props.history.push(`/detail/${id}`)
    }

    render() {
        const { topics } = this.props

        return (
            <div>
                <Helmet>
                    <title>topics</title>
                    <meta name="keywords" content="list" />
                </Helmet>
                <ul styleName="list">
                    {
                        topics.map(item => (
                            <div
                                styleName="item"
                                key={item.id}
                                onClick={() => this.handleClick(item.id)}
                            >
                                {item.title}
                            </div>
                        ))
                    }
                </ul>
            </div>
        )
    }
}
