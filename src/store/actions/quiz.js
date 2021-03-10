import axios from '../../axios/api'
import {
    QUIZ_CLEAN_ERROR,
    QUIZ_CLEAN_LOADING,
    QUIZ_SET_LOADING,
    QUIZ_SET_ERROR,
    QUIZ_FETCH_BY_ID,
    QUIZ_CLEAN,
    QUIZ_SET_SELECTED_ANSWER,
    QUIZ_SET_NEXT_QUESTION
} from './actionTypes'

const setError = error => ({
    type: QUIZ_SET_ERROR, error
})

const setLoading = () => ({
    type: QUIZ_SET_LOADING
})

export const setSelectedAnswer = (selectedAnswer) => ({
    type: QUIZ_SET_SELECTED_ANSWER, selectedAnswer
})

const cleanError = () => ({
    type: QUIZ_CLEAN_ERROR
})

const cleanLoading = () => ({
    type: QUIZ_CLEAN_LOADING
})

export const quizClean = () => ({
    type: QUIZ_CLEAN
})

export const setNextQuestion = () => ({
    type: QUIZ_SET_NEXT_QUESTION
})

export const fetchById = id => async dispatch => {

    dispatch(quizClean())
    dispatch(setLoading())

    try {

        const response = await axios.get(`/quizes/${id}`)
        
        dispatch({
            type: QUIZ_FETCH_BY_ID,
            quiz: response.data
        })
    } catch (e) {

        setError(e.message)
    } finally {

        dispatch(cleanLoading())
    }
}
