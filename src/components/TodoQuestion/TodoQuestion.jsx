import React, {useState} from 'react'
import { Button, Card, Radio } from 'antd'
import { connect } from 'react-redux'
import classes from './TodoQuestion.module.css'
import { setNextQuestion, setSelectedAnswer } from '../../store/actions/quiz'

const footerStyles = {
    marginTop: '2rem',
    display: 'flex',
    justifyContent: 'space-beetween',
    alignItems: 'center',
    width: '100%'
}

const answerTemplate = (id, text) => (
    <Radio className={classes.Radio} value={id} key={id}>
        {text}
    </Radio>
)

const TodoQuestion = props => {

    const changeRadioHandler = event => {

        props.setSelectedAnswer(event.target.value)
    }

    const questionTitle = (
        <>
            <h1>{props.quiz.currentQuestion?.text}</h1> {props.quiz.currentQuestionId} из {props.quiz.questions.length}
        </>
    )

    return (
        <Card title={questionTitle}>
            <Radio.Group onChange={changeRadioHandler} value={props.quiz.selectedAnswer}>
                {
                    props.quiz.currentQuestion?.answers.map(answer => answerTemplate(answer.id, answer.text))
                }
                <Button type="primary" onClick={props.setNextQuestion} style={{ marginTop: '2rem' }}>
                    Далее
                </Button>
            </Radio.Group>
        </Card>
    )
}

const mapStateToProps = state => ({
    quiz: state.quiz
})

const mapDispatchToProps = dispatch => ({
    setSelectedAnswer: selectedAnswer => dispatch(setSelectedAnswer(selectedAnswer)),
    setNextQuestion: () => dispatch(setNextQuestion())
})

export default connect(mapStateToProps, mapDispatchToProps)(TodoQuestion)
