import React from 'react'
import { Layout } from 'antd'
import classes from './MainLayout.module.css'
import HeaderMenu from '../../components/Header/Header'
import Sidebar from '../../components/Sidebar/Sidebar'

const { Header, Footer, Content } = Layout

const MainLayout = props => {

    return (
        <Layout>
            <Sidebar />
            <Layout>
                <Header className={classes.header}>
                    <HeaderMenu />
                </Header>
                <Content className={classes.content}>
                    {props.children}
                </Content>
                <Footer>Footer</Footer>
            </Layout>
        </Layout>
    )
}

export default MainLayout
