import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Todos from './pages/Todos/Todos'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Todo from './pages/Todo/Todo'
import TodoCreate from './pages/TodoCreate/TodoCreate'
import Error404 from './pages/Error404/Error404'
import Profile from './pages/Profile/Profile'

const App = props => {

    return (
        <div>
            <Switch>
                <Route exact path="/" component={Todos} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/profile" component={Profile} />
                <Route path="/todos/todo/create" component={TodoCreate} />
                <Route path="/todos/todo/:id" component={Todo} />
                <Route path="*" component={Error404} />
            </Switch>
        </div>
    )
}

export default App
