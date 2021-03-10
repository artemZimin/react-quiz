import React from 'react'
import { Form, Input, Select } from 'antd'
import { connect } from 'react-redux'
import {changeAnswer, changeRightAnswerId} from "../../store/actions/todoCreate";

const { Item } = Form
const { Option } = Select

const QuestionCreate = props => {

    const answersIsFiled = () => {

        const question = props.todoCreate.questions.filter(question => question.id === props.id)[0]

        return question.answers.every(answer => answer.text.trim())
    }

    const answerTemplate = id => {

        const question = props.todoCreate.questions.filter(question => question.id === props.id)[0]
        const answer = question.answers.filter(answer => answer.id === id)[0]

        return (
            <Item label={`${answer.id} вариант ответа`} key={id}>
                <Input
                    placeholder="Введите вариант ответа"
                    value={answer.text}
                    onChange={event => answerChangeHandler(event, question.id, id)}
                />
            </Item>
        )
    }

    const answerChangeHandler = (event, questionId, answerId) => {

        props.changeAnswer(questionId, answerId, event.target.value)
    }

    const changeRightAnswerHandler = value => {

        props.changeRightAnswerId(props.id, value)
    }

    const selectTemplate = (
        <Select
            disabled={!answersIsFiled()}
            value={props.todoCreate.questions[props.id - 1].rightAnswerId}
            onChange={changeRightAnswerHandler}
        >
            {
                props.todoCreate.questions.filter(question => question.id === props.id)[0].answers.map(answer => {
                    
                    return <Option value={answer.id} key={answer.id}>
                        {answer.text}
                    </Option>
                })
            }
        </Select>
    )

    return (
        <Form>
            {
                Array.from(new Array(4).keys()).map((_, idx) => answerTemplate(idx + 1))
            }
            <Item label="Выберете верный ответ на вопрос">
                {selectTemplate}
            </Item>
        </Form>
    )
}

const mapStateToProps = state => ({
    todoCreate: state.todoCreate
})
const mapDispatchToProps = dispatch => ({
    changeAnswer: (questionId, answerId, value) => dispatch(changeAnswer(questionId, answerId, value)),
    changeRightAnswerId: (questionId, rightAnswerId) => dispatch(changeRightAnswerId(questionId, rightAnswerId))
})

export default connect(mapStateToProps, mapDispatchToProps)(QuestionCreate)
