import React, { useState } from 'react'
import { Layout, Menu } from 'antd'
import { FormOutlined, FileDoneOutlined, IdcardOutlined } from '@ant-design/icons'
import { useHistory, useLocation } from 'react-router-dom'
import { connect } from 'react-redux'

const paths = {
    todos: '/',
    createTodo: '/todos/todo/create',
    profile: '/profile'
}

const Sidebar = props => {

    const [collapsed, setCollapsed] = useState(false)
    const history = useHistory()
    const location = useLocation()

    const activeClass = path => location.pathname === path ? 'ant-menu-item-selected' : null

    const redirectTo = to => history.push(to)

    const collapseHandler = collapsed => {

        setCollapsed(() => collapsed)
    }

    return (
        <Layout.Sider
            collapsible
            collapsed={collapsed}
            onCollapse={collapseHandler}
            style={{ background: '#fff' }}
        >
            <Menu style={{ paddingTop: '3rem' }}>
                <Menu.Item
                    icon={<FileDoneOutlined />}
                    className={activeClass(paths.todos)}
                    onClick={redirectTo.bind(null, paths.todos)}
                >
                    Тесты
                </Menu.Item>
                {
                    props.user.authToken
                        ? (
                        <>
                            <Menu.Item
                                icon={<FormOutlined />}
                                className={activeClass(paths.createTodo)}
                                onClick={redirectTo.bind(null, paths.createTodo)}
                            >
                                Создать новый тест
                            </Menu.Item>
                            <Menu.Item
                                icon={<IdcardOutlined />}
                                className={activeClass(paths.profile)}
                                onClick={redirectTo.bind(null, paths.profile)}
                            >
                                Профиль
                            </Menu.Item>
                        </>
                        )
                        : null
                }
            </Menu>
        </Layout.Sider>
    )
}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps)(Sidebar)
