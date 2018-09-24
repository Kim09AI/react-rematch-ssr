import React from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import './style.styl'

const mapState = state => ({
    detail: state.detail
})

@connect(mapState)
export default class Detail extends React.Component {
    static propTypes = {
        detail: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    }

    goBack() {
        this.props.history.goBack()
    }

    render() {
        const { detail } = this.props

        return (
            <div>
                <Helmet>
                    <title>{detail.title}</title>
                    <meta name="keywords" content="HTML,ASP,PHP,SQL" />
                </Helmet>
                <div onClick={() => this.goBack()} style={{ cursor: 'pointer' }}>返回</div>
                <div styleName="wrapper">
                    <h3 styleName="title">{detail.title}</h3>
                    <div styleName="info">
                        <span>{detail.author ? detail.author.loginname : null}</span>
                        <span>--</span>
                        <span>{detail.create_at}</span>
                    </div>
                    <div styleName="content" dangerouslySetInnerHTML={{ __html: detail.content }} />
                </div>
            </div>
        )
    }
}
