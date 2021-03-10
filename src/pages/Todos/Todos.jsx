import React, { useEffect } from 'react'
import MainLayout from '../../layouts/MainLayout/MainLayout'
import { List, Alert, Row, Col, Spin } from 'antd'
import TodoItem from '../../components/TodoItem/TodoItem'
import { connect } from 'react-redux'
import { fetchAll } from '../../store/actions/quizes'
import { dateToLocalFormat } from '../../utils/dateFunctions'

const Todos = props => {

    useEffect(() => {

        props.fetchAll()
    }, [])

    const loadingTemplate = (
        <div style={{ textAlign: 'center' }}>
            <Spin size="large" />
        </div>
    )

    const errorTemplate = (
        <Row>
            <Col span={10} offset={7}>
                <Alert message={props.quizes.error} type="error" showIcon />
            </Col>
        </Row>
    )

    return (
        <MainLayout>
            {
                props.quizes.loading
                    ? loadingTemplate
                    : props.quizes.error
                        ? errorTemplate
                        : props.quizes.quizes.length
                            ? (
                                <List
                                    itemLayout="horizontal"
                                    dataSource={props.quizes.quizes}
                                    renderItem={
                                        item => (
                                            <TodoItem
                                                to={item._id}
                                                title={item.title}
                                                description={dateToLocalFormat(item.date)}
                                            />
                                        )
                                    }
                                />
                            )
                            : <h1 style={{ textAlign: 'center' }}>Пока нет тестов</h1>
            }
        </MainLayout>
    )
}

const mapStateToProps = state => ({
    quizes: state.quizes
})

const mapDispatchToProps = dispatch => ({
    fetchAll: () => dispatch(fetchAll())
})


export default connect(mapStateToProps, mapDispatchToProps)(Todos)
