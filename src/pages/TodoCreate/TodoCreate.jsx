import React, { useState, useEffect } from 'react'
import { Collapse, Row, Col, Input, Button, message } from 'antd'
import MainLayout from '../../layouts/MainLayout/MainLayout'
import QuestionCreate from '../../components/QuestionCreate/QuestionCreate'
import RedirectIfGuest from '../../middlewares/RedirectIfGuest'
import { connect } from 'react-redux'
import { addQuestion, changeTitle, createTodo, todoClean } from '../../store/actions/todoCreate'

const { Panel } = Collapse
const { Search } = Input

const TodoCreate = props => {

    useEffect(() => props.todoClean, [])

    useEffect(() => {

        if (props.todoCreate.error) {

            message.error(props.todoCreate.error)
        }
    }, [props.todoCreate.error])

    const [question, setQuestion] = useState('')

    const titleChangeHandler = event => {

        props.changeTitle(event.target.value)
    }

    const questionChangeHandler = event => {

        setQuestion(() => event.target.value)
    }

    const questionTemplate = (header, id) => (
        <Panel header={header} key={id}>
            <QuestionCreate id={id} />
        </Panel>
    )

    const addQuestion = () => {

        if (!question.trim()) return

        props.addQuestion(question)
        setQuestion(() => '')
    }

    const answersIsField = () => {

        const questions = props.todoCreate.questions
    
        if (!questions.length) return true

        return questions.every(question => {

            return question.answers.every(answer => answer.text.trim())
        })
    }

    return (
        <MainLayout>
            <RedirectIfGuest />
            <Row>
                <Col span={14} offset={5}>
                    <Input
                        style={{ marginBottom: '1rem' }}
                        placeholder="Введите название теста"
                        value={props.todoCreate.title}
                        onChange={titleChangeHandler}
                    />
                    <Collapse>
                        {
                            props.todoCreate.questions.map(question => questionTemplate(
                                question.text, question.id
                            ))
                        }
                    </Collapse>
                    <Search
                        style={{ marginTop: '2rem' }}
                        placeholder="Введите текст вопроса"
                        enterButton="Добавить вопрос"
                        value={question}
                        onChange={questionChangeHandler}
                        onSearch={addQuestion}
                        disabled={!answersIsField()}
                    />
                    <Button
                        style={{ width: '100%', marginTop: '1rem' }}
                        type="primary"
                        onClick={props.createTodo.bind(null, props.todoCreate, props.user.id)}
                        disabled={
                            !answersIsField() || !props.todoCreate.questions.length || !props.todoCreate.title.trim()
                        }
                        loading={props.todoCreate.loading}
                    >Создать тест</Button>
                </Col>
            </Row>
        </MainLayout>
    )
}

const mapStateToProps = state => ({
    todoCreate: state.todoCreate,
    user: state.user
})

const mapDispatchToProps = dispatch => ({
    changeTitle: value => dispatch(changeTitle(value)),
    addQuestion: value => dispatch(addQuestion(value)),
    createTodo: (todo, authorId) => dispatch(createTodo(todo, authorId)),
    todoClean: () => dispatch(todoClean())
})

export default connect(mapStateToProps, mapDispatchToProps)(TodoCreate)
