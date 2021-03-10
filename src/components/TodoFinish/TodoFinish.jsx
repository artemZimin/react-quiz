import React, { useEffect } from 'react'
import { Button, Card, List, Typography, Alert, Spin } from 'antd'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchById } from '../../store/actions/quiz'
import { createQuiz } from '../../store/actions/completedQuizes'

const loadingTemplate = (
    <div style={{ textAlign: 'center' }}>
        <Spin size="large" />
    </div>
)

const TodoFinish = props => {

    const rightAnswersCount = props.quiz.questionsComplete.reduce((rightAnswers, currentAnswer) => {
        
        return currentAnswer.rightAnswerId === currentAnswer.selectedAnswerId
            ? rightAnswers + 1
            : rightAnswers
    }, 0)

    useEffect(() => {

        if (props.quiz.questionsIsFinished) {

            props.createCompletedQuiz(props.user.id, props.quiz)
        }

    }, [])

    const quizResultsTemplate = (
        <Card title="Результаты теста">
            <List
                dataSource={props.quiz.questionsComplete}
                footer={<h5>Баллов: {rightAnswersCount} из {props.quiz.questionsComplete.length}</h5>}
                renderItem={item => (
                    <List.Item>
                        <Typography.Text
                            type={item.rightAnswerId === item.selectedAnswerId ? 'success' : 'danger'}
                        >
                            {item.text}
                        </Typography.Text>
                    </List.Item>
                )}
            />
            <Button type="primary" onClick={props.fetchById.bind(null, props.quizId)} style={{ marginRight: '2rem' }}>
                Попробовать заного
            </Button>
            <Link to="/">
                <Button>
                    Список тестов
                </Button>
            </Link>
        </Card>
    )

    return (
        props.completedQuizes.loading
            ? loadingTemplate
            : props.completedQuizes.error
                ? (
                    <Alert
                        message={props.completedQuizes.error}
                        type="error"
                        showIcon
                    />
                )
                : quizResultsTemplate
    )
}

const mapStateToProps = state => ({
    quiz: state.quiz,
    user: state.user,
    completedQuizes: state.completedQuizes
})

const mapDispatchToProps = dispatch => ({
    fetchById: id => dispatch(fetchById(id)),
    createCompletedQuiz: (userId, quiz) => dispatch(createQuiz(userId, quiz))
})

export default connect(mapStateToProps, mapDispatchToProps)(TodoFinish)
