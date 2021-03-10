import React from 'react'
import EmptyLayout from '../../layouts/EmptyLayout/EmptyLayout'
import { Link } from 'react-router-dom'

const Component = props => {

    return (
        <EmptyLayout>
            Данной страницы не существует&nbsp;
            <Link to="/">вернуться на главную?</Link>
        </EmptyLayout>
    )
}

export default Component
