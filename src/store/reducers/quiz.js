import {
    QUIZ_SET_ERROR,
    QUIZ_SET_LOADING,
    QUIZ_CLEAN_ERROR,
    QUIZ_CLEAN_LOADING,
    QUIZ_FETCH_BY_ID,
    QUIZ_CLEAN,
    QUIZ_SET_SELECTED_ANSWER,
    QUIZ_SET_NEXT_QUESTION
} from '../actions/actionTypes'

const initialState = {
    id: null,
    title: null,
    questions: [],
    questionsComplete: [],
    currentQuestion: null,
    questionsIsFinished: false,
    currentQuestionId: null,
    selectedAnswer: null,
    loading: false,
    error: null
}

const handlers = {
    DEFAULT: state => state,
    [QUIZ_SET_ERROR]: (state, action) => ({
        ...state, error: action.error
    }),
    [QUIZ_SET_LOADING]: state => ({
        ...state, loading: true
    }),
    [QUIZ_CLEAN_ERROR]: state => ({
        ...state, error: null
    }),
    [QUIZ_CLEAN_LOADING]: state => ({
        ...state, loading: false
    }),
    [QUIZ_FETCH_BY_ID]: (state, action) => ({
        ...state,
        id: action.quiz._id,
        title: action.quiz.title,
        questions: action.quiz.questions,
        currentQuestionId: 1,
        currentQuestion: action.quiz.questions.filter(question => question.id === 1)[0],
        selectedAnswer: 1
    }),
    [QUIZ_CLEAN]: () => ({...initialState}),
    [QUIZ_SET_SELECTED_ANSWER]: (state, action) => ({
        ...state,
        selectedAnswer: action.selectedAnswer
    }),
    [QUIZ_SET_NEXT_QUESTION]: state => {

        const isFinalyQuestion = state.currentQuestionId === state.questions.length
        let questionsComplete = [...state.questionsComplete]

        questionsComplete.push({
            ...state.currentQuestion,
            selectedAnswerId: state.selectedAnswer
        })

        const currentQuestionId = isFinalyQuestion ? initialState.currentQuestionId : state.currentQuestionId + 1

        const currentQuestion = isFinalyQuestion
            ? initialState.currentQuestion
            : state.questions.filter(question => question.id === currentQuestionId)[0]

        const selectedAnswer = isFinalyQuestion ? initialState.selectedAnswer : 1

        return {
            ...state,
            currentQuestionId,
            questionsIsFinished: isFinalyQuestion,
            selectedAnswer,
            currentQuestion,
            questionsComplete
        }
    }
}

const quizReducer = (state = initialState, action) => {

    const handler = handlers[action.type] ?? handlers.DEFAULT

    return handler(state, action)
}

export default quizReducer
