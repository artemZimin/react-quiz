import {
    COMPLETED_QUIZES_CLEAN,
    COMPLETED_QUIZES_CLEAN_LOADING,
    COMPLETED_QUIZES_CLEAN_ERROR,
    COMPLETED_QUIZES_SET_ERROR,
    COMPLETED_QUIZES_SET_LOADING,
    COMPLETED_QUIZES_FETCH_BY_USER_ID,
    COMPLETED_QUIZES_FETCH_ALL
} from '../actions/actionTypes'

const initialState = {
    quizId: null,
    userId: null,
    date: null,
    questions: [],
    loading: false,
    error: null,
    completedQuizes: []
}

const handlers = {
    DEFAULT: state => state,
    [COMPLETED_QUIZES_CLEAN]: () => ({ ...initialState }),
    [COMPLETED_QUIZES_SET_LOADING]: state => ({
        ...state, loading: true
    }),
    [COMPLETED_QUIZES_CLEAN_LOADING]: state => ({
        ...state, loading: false
    }),
    [COMPLETED_QUIZES_SET_ERROR]: (state, action) => ({
        ...state, error: action.error
    }),
    [COMPLETED_QUIZES_CLEAN_ERROR]: state => ({
        ...state, error: null
    }),
    [COMPLETED_QUIZES_FETCH_BY_USER_ID]: (state, action) => ({
        ...state, completedQuizes: action.quizes
    })
}

const completedQuizReducer = (state = initialState, action) => {

    const handler = handlers[action.type] ?? handlers.DEFAULT

    return handler(state, action)
}

export default completedQuizReducer
