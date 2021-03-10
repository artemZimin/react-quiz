import {
    QUIZES_CLEAN_ERROR,
    QUIZES_CLEAN_LOADING,
    QUIZES_FETCH_ALL,
    QUIZES_SET_ERROR,
    QUIZES_SET_LOADING
} from '../actions/actionTypes'

const initialState = {
    error: null,
    loading: false,
    quizes: []
}

const handlers = {
    DEFAULT: state => state,
    [QUIZES_SET_LOADING]: state => ({
        ...state,
        loading: true
    }),
    [QUIZES_CLEAN_LOADING]: state => ({
        ...state,
        loading: false
    }),
    [QUIZES_FETCH_ALL]: (state, action) => ({
        ...state,
        quizes: action.quizes
    }),
    [QUIZES_SET_ERROR]: (state, action) => ({
        ...state,
        error: action.error
    }),
    [QUIZES_CLEAN_ERROR]: state => ({
        ...state,
        error: null
    })
}

const quizesReducer = (state = initialState, action) => {

    const handler = handlers[action.type] ?? handlers.DEFAULT

    return handler(state, action)
}

export default quizesReducer
