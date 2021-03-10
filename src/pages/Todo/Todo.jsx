import React, { useEffect } from 'react'
import { Row, Col, message, Spin, Alert } from 'antd'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import MainLayout from '../../layouts/MainLayout/MainLayout'
import TodoFinish from '../../components/TodoFinish/TodoFinish'
import TodoQuestion from '../../components/TodoQuestion/TodoQuestion'
import classes from './Todo.module.css'
import { fetchById, quizClean } from '../../store/actions/quiz'

const loadingTemplate = (
    <div style={{ textAlign: 'center' }}>
        <Spin size="large" />
    </div>
)

const Wrapper = props => (
    <MainLayout>
        <Row>
            <Col span={14} offset={5}>
                {props.children}
            </Col>
        </Row>
    </MainLayout>
)

const Todo = props => {

    const history = useHistory()

    useEffect(() => {

        if (!props.user.authToken) {

            history.push('/login')
            message.error('Для начала авторизуйтесь')
            return
        }

        props.fetchById(props.match.params.id)

        return props.quizClean
    }, [])

    return (
        <Wrapper>
            {
                props.quiz.loading
                    ? loadingTemplate
                    : !props.quiz.error
                        ? (
                            <>
                                <h1 className={classes.title}>{props.quiz.title}</h1>
                                {
                                    !props.quiz.questionsIsFinished
                                        ? <TodoQuestion />
                                        : <TodoFinish quizId={props.match.params.id} />
                                }
                            </>
                        )
                        : (
                            <Alert
                                message={props.quiz.error}
                                type="error"
                                showIcon
                            />
                        )
            }
        </Wrapper>
    )
}

const mapStateToProps = state => ({
    user: state.user,
    quiz: state.quiz
})

const mapDispatchToProps = dispatch => ({
    fetchById: id => dispatch(fetchById(id)),
    quizClean: () => dispatch(quizClean())
})

export default connect(mapStateToProps, mapDispatchToProps)(Todo)
