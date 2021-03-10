import {
    CLEAN_ERROR,
    CLEAN_USER,
    CREATE_USER,
    SET_ERROR,
    SET_LOADING,
    UNSET_LOADING
} from '../actions/actionTypes'

const initialState = {
    id: null,
    name: null,
    email: null,
    authToken: null,
    error: null,
    loading: false
}

const handlers = {
    DEFAULT: state => state,
    [SET_ERROR]: (state, action) => ({
        ...state,
        error: action.message
    }),
    [CLEAN_ERROR]: state => ({
        ...state,
        error: null
    }),
    [SET_LOADING]: state => ({
        ...state,
        loading: true
    }),
    [UNSET_LOADING]: state => ({
        ...state,
        loading: false
    }),
    [CREATE_USER]: (state, action) => ({
        ...state,
        id: action.user._id,
        name: action.user.name,
        password: action.user.password,
        email: action.user.email,
        authToken: action.user.authToken
    }),
    [CLEAN_USER]: () => ({...initialState})
}

const userReducer = (state = initialState, action) => {

    state = {...state}

    const handler = handlers[action.type] ?? handlers.DEFAULT

    return handler(state, action)
}

export default userReducer
