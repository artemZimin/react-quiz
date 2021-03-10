import React, { useEffect } from 'react'
import EmptyLayout from '../../layouts/EmptyLayout/EmptyLayout'
import { Form, Input, Button, message } from 'antd'
import { connect } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { createUser } from '../../store/actions/user'

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const Register = props => {

    const history = useHistory()

    useEffect(() => {

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

        props.createUser(values)
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
        ],
        name: [
            { required: true, message: 'Имя обязательно к заполнению' },
            { min: 6, message: 'Имя должно содержать минимум 6 символов' },
            { max: 200, message: 'Имя должно содержать максимум 200 символов' }
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
                    label="Имя"
                    name="name"
                    rules={rules.name}
                >
                    <Input />
                </Form.Item>
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

                {/* <Form.Item
                    label="Повторить пароль"
                    name="repeat"
                    rules={rules.password}
                >
                    <Input.Password />
                </Form.Item> */}

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{ width: '100%', marginTop: '2rem' }}
                        loading={props.user.loading}
                    >
                        Зарегистрироваться
                    </Button>
                    У вас уже есть аккаунт? <Link to="/login">Войти</Link>
                </Form.Item>
            </Form>
        </EmptyLayout>
    )
}

const mapStateToProps = state => ({
    user: state.user
})

const mapDispatchToProps = dispatch => ({
    createUser: formData => dispatch(createUser(formData))
})

export default connect(mapStateToProps, mapDispatchToProps)(Register)