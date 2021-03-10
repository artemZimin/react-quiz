import axios from '../../axios/api'
import {
    CLEAN_ERROR, CLEAN_USER,
    CREATE_USER,
    SET_ERROR,
    SET_LOADING,
    UNSET_LOADING
} from './actionTypes'

const setError = message => ({
    type: SET_ERROR,
    message
})

const setUser = user => ({
    type: CREATE_USER,
    user
})

export const cleanError = () => ({
    type: CLEAN_ERROR
})

const setLoading = () => ({
    type: SET_LOADING
})

const unsetLoading = () => ({
    type: UNSET_LOADING
})

export const createUser = formData => async dispatch => {

    dispatch(cleanError())
    dispatch(setLoading())

    try {

        const response = await axios.post('/user', formData)

        dispatch(unsetLoading())
        dispatch(setUser(response.data))
    } catch (e) {

        dispatch(unsetLoading())

        if (e.request.status === 403) {

            const message = JSON.parse(e.request.response).message

            dispatch(setError(message))
        } else if (e.request.status !== 200) {

            dispatch(setError('Неизвестная ошибка'))
        }
    }
}

export const login = formData => async dispatch => {

    dispatch(cleanError())
    dispatch(setLoading())

    try {

        const response = await axios.post('/user/login', formData)

        dispatch(unsetLoading())
        dispatch(setUser(response.data))
    } catch (e) {

        dispatch(unsetLoading())

        if (e.request.status === 404) {

            const message = JSON.parse(e.request.response).message

            dispatch(setError(message))
        } else if (e.request.status !== 200) {

            dispatch(setError('Неизвестная ошибка'))
        }
    }
}

export const logout = () => ({ type: CLEAN_USER })
