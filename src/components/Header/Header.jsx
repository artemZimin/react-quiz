import React from 'react'
import { Menu } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import {logout} from '../../store/actions/user'

const Header = props => {

    let history = useHistory()

    const redirectToLogin = () => {

        history.push('/login')
    }
    const redirectToRegister = () => {

        history.push('/register')
    }

    const logout = () => {

        props.logout()
        history.push('/')
    }

    const guest = (
        <Menu.SubMenu title="Войти в систему" icon={<UserOutlined />}>
            <Menu.Item onClick={redirectToLogin}>Войти</Menu.Item>
            <Menu.Item onClick={redirectToRegister}>Зарегистрироваться</Menu.Item>
        </Menu.SubMenu>
    )

    const user = (
        <Menu.Item onClick={logout} icon={<UserOutlined />}>Выйти</Menu.Item>
    )

    return (
        <Menu
            mode="horizontal"
            theme="Light"
        >
            {
                props.user.authToken
                    ? user
                    : guest
            }
        </Menu>
    )
}

const mapStateToProps = state => ({
    user: state.user
})

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
