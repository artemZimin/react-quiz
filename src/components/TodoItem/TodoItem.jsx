import React from 'react'
import { Row, Col, List } from 'antd'
import { Link } from 'react-router-dom'

const TodoItem = props => {

    return (
        <Row>
            <Col span={14} offset={5}>
                <List.Item>
                    <List.Item.Meta
                        title={<Link to={'/todos/todo/' + props.to}>{props.title}</Link>}
                        description={props.description}
                    />
                </List.Item>
            </Col>
        </Row>
    )
}

export default TodoItem
