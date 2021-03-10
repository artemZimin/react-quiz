import React, { useEffect } from 'react'
import EmptyLayout from '../../layouts/EmptyLayout/EmptyLayout'
import { Form, Input, Button, message } from 'antd'
import { Link, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { login, cleanError } from '../../store/actions/user'

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const Login = props => {

    const history = useHistory()

    useEffect(() => {

        props.cleanError()

        if (props.user.authToken) {

            history.push('/')
        }
    }, [props.user.authToken, history])

    useEffect(() => {

        if (props.user.error) {

            message.error(props.user.error)
        }
    }, [props.user.error])

    const finishHandler = values => {

        props.login(values)
    }

    const finishFailedHandler = (errorInfo) => {
        console.log('error', errorInfo)
    }

    const rules = {
        email: [
            { required: true, message: 'Email обязателен к заполнению' },
            { pattern: emailRegex, message: 'Данное поле должно содержать email' }
            ],
        password: [
            { required: true, message: 'Пароль обязателен к заполнению' },
            { min: 6, message: 'Пароль должен содержать минимум 6 символов' },
            { max: 50, message: 'Пароль должен содержать максимум 50 символов' }
        ]
    }

    return (
        <EmptyLayout>
            <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={finishHandler}
                onFinishFailed={finishFailedHandler}
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={rules.email}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Пароль"
                    name="password"
                    rules={rules.password}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{ width: '100%' }}
                        loading={props.user.loading}
                    >
                        Войти
                    </Button>
                    Ещё нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
                </Form.Item>
            </Form>
        </EmptyLayout>
    )
}

const mapStateToProps = state => ({
    user: state.user
})

const mapDispatchToProps = dispatch => ({
    login: formData => dispatch(login(formData)),
    cleanError: () => dispatch(cleanError())
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)