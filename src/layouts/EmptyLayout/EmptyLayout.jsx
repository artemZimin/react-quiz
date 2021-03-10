import React from 'react'
import classes from './EmptyLayout.module.css'

const EmptyLayout = props => {

    return (
        <div className={classes.container}>
            {props.children}
        </div>
    )
}

export default EmptyLayout