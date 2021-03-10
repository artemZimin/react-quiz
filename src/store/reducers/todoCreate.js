import {
    TODO_CREATE,
    TODO_CREATE_ADD_QUESTION, TODO_CREATE_CHANGE_ANSWER,
    TODO_CREATE_CHANGE_RIGHT_ANSWER_ID,
    TODO_CREATE_CHANGE_TITLE,
    TODO_CREATE_CLEAN_ERROR,
    TODO_CREATE_CLEAN_LOADING,
    TODO_CREATE_SET_ERROR,
    TODO_CREATE_SET_LOADING,
    TODO_CREATE_CLEAN
} from '../actions/actionTypes'

const initialState = {
    title: null,
    authorId: null,
    questions: [],
    loading: false,
    error: null
}

const answers = [
    {
        text: '',
        id: 1
    },
    {
        text: '',
        id: 2
    },
    {
        text: '',
        id: 3
    },
    {
        text: '',
        id: 4
    },
]

const handlers = {
    DEFAULT: state => state,
    [TODO_CREATE_CHANGE_TITLE]: (state, action) => ({
        ...state,
        title: action.value
    }),
    [TODO_CREATE_ADD_QUESTION]: (state, action) => ({
        ...state,
        questions: [
            ...state.questions,
            {
                id: state.questions.length + 1,
                text: action.value,
                rightAnswerId: 1,
                answers
            }
        ]
    }),
    [TODO_CREATE_CHANGE_ANSWER]: (state, action) => {
        state = {...state}
        const changedAnswer = {
            text: action.value,
            id: action.answerId
        }

        const answers = [...state.questions[action.questionId - 1].answers].map(answer => {

            if (answer.id === action.answerId) {

                return changedAnswer
            }

            return answer
        })
        
        state.questions = state.questions.map(question => {

            if (question.id === action.questionId) {

                return {
                    ...question,
                    answers
                }
            }

            return question
        })

        return state
    },
    [TODO_CREATE_CHANGE_RIGHT_ANSWER_ID]: (state, action) => {

        state = {...state}

        state.questions = state.questions.map(question => {

            if (question.id === action.questionId) {

                question.rightAnswerId = action.rightAnswerId
            }

            return question
        })

        return state
    },
    [TODO_CREATE_SET_LOADING]: state => ({
        ...state,
        loading: true
    }),
    [TODO_CREATE_CLEAN_LOADING]: state => ({
        ...state,
        loading: false
    }),
    [TODO_CREATE]: () => ({...initialState}),
    [TODO_CREATE_SET_ERROR]: (state, action) => ({
        ...state,
        error: action.error
    }),
    [TODO_CREATE_CLEAN_ERROR]: state => ({
        ...state,
        error: null
    }),
    [TODO_CREATE_CLEAN]: () => ({...initialState})
}

const todoCreateReducer = (state = initialState, action) => {

    state = {...state}

    const handler = handlers[action.type] ?? handlers.DEFAULT

    return handler(state, action)
}

export default todoCreateReducer
