import { combineReducers } from 'redux'
import user from './user'
import todoCreate from './todoCreate'
import quizes from './quizes'
import quiz from './quiz'
import completedQuizes from './completedQuizes'

export default combineReducers({
    user, todoCreate, quizes, quiz, completedQuizes
})
