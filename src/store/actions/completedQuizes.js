import {
    COMPLETED_QUIZES_CLEAN,
    COMPLETED_QUIZES_CLEAN_LOADING,
    COMPLETED_QUIZES_CLEAN_ERROR,
    COMPLETED_QUIZES_SET_ERROR,
    COMPLETED_QUIZES_SET_LOADING,
    COMPLETED_QUIZES_FETCH_BY_USER_ID
} from './actionTypes'

import axios from '../../axios/api'

export const cleanCompletedQuizes = () => ({
    type: COMPLETED_QUIZES_CLEAN
})

const setError = error => ({
    type: COMPLETED_QUIZES_SET_ERROR, error
})

export const cleanError = () => ({
    type: COMPLETED_QUIZES_CLEAN_ERROR
})

const setLoading = () => ({
    type: COMPLETED_QUIZES_SET_LOADING
})

const cleanLoading = () => ({
    type: COMPLETED_QUIZES_CLEAN_LOADING
})

export const fetchByUserId = userId => async dispatch => {

    dispatch(cleanCompletedQuizes())
    dispatch(setLoading())

    try {

        const response = await axios.get(`/completed-quizes/${userId}`)

        dispatch({
            type: COMPLETED_QUIZES_FETCH_BY_USER_ID, quizes: response.data
        })

    } catch (e) {

        dispatch(setError(e.message))

    } finally {

        dispatch(cleanLoading())
    }
}

export const createQuiz = (userId, quiz) => async dispatch => {
    
    dispatch(setLoading())

    try {

        quiz.quizId = quiz.id
        quiz.questions = quiz.questionsComplete
        
        await axios.post('/completed-quizes', { userId, ...quiz })

    } catch (e) {

        dispatch(setError(e.message))
        
    } finally {

        dispatch(cleanLoading())
    }
}
