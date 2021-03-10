import React, { useEffect } from 'react'
import {
    Divider,
    Collapse,
    Row,
    Col, message,
    Alert,
    Spin,
    List,
    Typography,
    Button
} from 'antd'
import { useHistory, Link } from 'react-router-dom'
import MainLayout from '../../layouts/MainLayout/MainLayout'
import { connect } from 'react-redux'
import { fetchByUserId, cleanCompletedQuizes } from '../../store/actions/completedQuizes'

const { Panel } = Collapse

const loadingTemplate = (
    <div style={{ textAlign: 'center' }}>
        <Spin size="large" />
    </div>
)

const Profile = props => {

    const history = useHistory()

    useEffect(() => {

        if (!props.user.authToken) {

            history.push('/login')
            message.error('Для начала авторизуйтесь')
            return
        }

        props.fetchByUserId(props.user.id)

    }, [])

    const errorTemplate = <Alert message={props.completedQuizes.error} type="error" showIcon />

    const completedQuizTemplate = quiz => (
        <Panel key={quiz.id} header={quiz.title}>
            <List
                dataSource={quiz.questions}
                renderItem={question => (
                    <List.Item key={question.id}>
                        <Typography.Text
                            type={question.rightAnswerId === question.selectedAnswerId ? 'success' : 'danger'}
                        >
                            {question.text}
                        </Typography.Text>
                    </List.Item>
                )}
            />
            <Link to={`/todos/todo/${quiz.quizId}`}>
                <Button type="primary">Пройти заного</Button>
            </Link>
        </Panel>
    )

    const completedQuizesTemplate = (
        <>
            <Divider
                orientation="left"
            >Пройденные тесты</Divider>
            <Collapse>
                {
                    props.completedQuizes.completedQuizes.map(quiz => completedQuizTemplate(quiz)).reverse()
                }
            </Collapse>
        </>
    )

    const profileTemplate = (
        <>
            <h1 style={{textAlign: 'center', width: '100%'}}>
                {props.user.name?.toUpperCase()}
            </h1>
            {
                props.completedQuizes.loading
                ? loadingTemplate
                : props.completedQuizes.error
                    ? errorTemplate
                    : !props.completedQuizes.completedQuizes.length
                        ? <p>Здесь будут результаты пройденных тестов</p>
                        : completedQuizesTemplate
            }
        </>
    )

    return (
        <MainLayout>
            <Row>
                <Col span={14} offset={5}>
                    {profileTemplate}
                </Col>
            </Row>
        </MainLayout>
    )
}

const mapStateToProps = state => ({
    user: state.user,
    completedQuizes: state.completedQuizes
})

const mapDispatchToProps = dispatch => ({
    fetchByUserId: userId => dispatch(fetchByUserId(userId)),
    cleanCompletedQuizes: () => dispatch(cleanCompletedQuizes())
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
