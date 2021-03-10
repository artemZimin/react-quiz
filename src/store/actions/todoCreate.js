import {
    TODO_CREATE,
    TODO_CREATE_ADD_QUESTION,
    TODO_CREATE_CHANGE_ANSWER,
    TODO_CREATE_CHANGE_RIGHT_ANSWER_ID,
    TODO_CREATE_CHANGE_TITLE,
    TODO_CREATE_SET_LOADING,
    TODO_CREATE_SET_ERROR,
    TODO_CREATE_CLEAN_LOADING,
    TODO_CREATE_CLEAN_ERROR,
    TODO_CREATE_CLEAN
} from './actionTypes'
import axios from '../../axios/api'

export const changeTitle = value => ({
    type: TODO_CREATE_CHANGE_TITLE, value
})

export const addQuestion = value => ({
    type: TODO_CREATE_ADD_QUESTION, value
})

export const changeAnswer = (questionId, answerId, value) => ({
    type: TODO_CREATE_CHANGE_ANSWER, questionId, answerId, value
})

export const changeRightAnswerId = (questionId, rightAnswerId) => ({
    type: TODO_CREATE_CHANGE_RIGHT_ANSWER_ID, questionId, rightAnswerId
})

const setLoading = () => ({
    type: TODO_CREATE_SET_LOADING
})

const cleanLoading = () => ({
    type: TODO_CREATE_CLEAN_LOADING
})

const setError = error => ({
    type: TODO_CREATE_SET_ERROR,
    error
})

const cleanError = () => ({
    type: TODO_CREATE_CLEAN_ERROR
})

export const todoClean = () => ({
    type: TODO_CREATE_CLEAN
})

export const createTodo = (quiz, authorId) => async dispatch => {

    dispatch(cleanError())
    dispatch(setLoading())

    try {

        await axios.post('/quizes', {...quiz, authorId})
    } catch (e) {

        dispatch(setError(e.message))
    } finally {

        dispatch(cleanLoading())
    }

    dispatch({
        type: TODO_CREATE
    })
}
