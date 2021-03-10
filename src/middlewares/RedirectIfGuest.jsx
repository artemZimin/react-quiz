import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'

const RedirectIfGuest = props => {

    const history = useHistory()

    useEffect(() => {

        if (!props.user.authToken) {

            history.push('/')
        }
    }, [history, props.user.authToken])

    return (
        <></>
    )
}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps)(RedirectIfGuest)
