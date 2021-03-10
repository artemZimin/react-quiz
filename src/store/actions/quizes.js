import axios from '../../axios/api'
import { QUIZES_CLEAN_ERROR, QUIZES_CLEAN_LOADING, QUIZES_FETCH_ALL, QUIZES_SET_ERROR, QUIZES_SET_LOADING } from './actionTypes'

const setLoading = () => ({
    type: QUIZES_SET_LOADING
})

const cleanLoading = () => ({
    type: QUIZES_CLEAN_LOADING
})

const setError = error => ({
    type: QUIZES_SET_ERROR, error
})

const cleanError = () => ({
    type: QUIZES_CLEAN_ERROR
})

const fetchQuizes = quizes => ({
    type: QUIZES_FETCH_ALL,
    quizes
})

export const fetchAll = () => async dispatch => {

    dispatch(cleanError())
    dispatch(setLoading())

    try {

        const response = await axios.get('/quizes')

        dispatch(fetchQuizes(response.data))
    } catch (e) {

        dispatch(setError(e.message))
    } finally {

        dispatch(cleanLoading())
    }
}
