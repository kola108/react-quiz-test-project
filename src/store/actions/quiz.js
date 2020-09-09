import axios from "../../shared/axios-quiz"
import {
    FETCH_QUIZES_START,
    FETCH_QUIZES_SUCCESS,
    FETCH_QUIZES_ERROR,
    FETCH_QUIZ_SUCCESS,
    QUIZ_SET_STATE,
    FINISH_QUIZ,
    NEXT_QUESTION,
    RETRY_QUIZ
} from "./actionTypes"

export function fetchQuizes() {
    return async dispatch => {
        dispatch(fetchQuizesStart())
        try {
            const response = await axios.get('quiz.json')

            const quizes = []

            Object.keys(response.data).forEach((key, index) => {
                quizes.push({
                    id: key,
                    name: `Test number ${index + 1}`
                })
            })

            dispatch(fetchQuizesSuccess(quizes))
        } catch (err) {
            dispatch(fetchQuizesError(err))
        }
    }
}


export function fetchQuizById(quizId) {
    return async dispatch => {
        dispatch(fetchQuizesStart())

        try {
            const response = await axios.get(`quiz/${quizId}.json`)
            const quiz = response.data

            dispatch(fetchQuizSucess(quiz))
        } catch (e) {
            dispatch(fetchQuizesError(e))
        }
    }
}

export function quizAnswerClick(answerId) {
    return (dispatch, getState) => {
        const state = getState().quiz

        if (state.answerState) {
            const key = Object.keys(state.answerState)[0]
            if (state.answerState[key] === 'success') {
                return
            }
        }

        const question = state.quiz[state.activeQuiz];
        const results = state.results;

        if (question.rightAnswerId === answerId) {
            if (!results[question.id]) {
                results[question.id] = 'success'
            }

            dispatch(quizSetState({[answerId]: 'success'}, results))

            const timeOut = window.setTimeout(() => {
                if (isQuizFinished(state)) {
                    dispatch(finishQuiz())
                } else {
                    dispatch(quizNextQuestion(state.activeQuiz + 1))
                }

                window.clearTimeout(timeOut)
            }, 1000)
        } else {
            results[question.id] = 'error';

            dispatch(quizSetState({[answerId]: 'error'}, results))
        }
    }
}

export function retryQuiz() {
    return {
        type: RETRY_QUIZ
    }
}

export function isQuizFinished(state) {
    return state.activeQuiz + 1 === state.quiz.length
}

export function quizNextQuestion(questionNumber) {
    return {
        type: NEXT_QUESTION,
        questionNumber
    }
}

export function finishQuiz() {
    return {
        type: FINISH_QUIZ
    }
}

export function quizSetState(answerState, results) {
    return {
        type: QUIZ_SET_STATE,
        answerState,
        results
    }
}

export function fetchQuizesStart() {
    return {
        type: FETCH_QUIZES_START
    }
}

export function fetchQuizesSuccess(quizes) {
    return {
        type: FETCH_QUIZES_SUCCESS,
        quizes
    }
}

export function fetchQuizSucess(quiz) {
    return {
        type: FETCH_QUIZ_SUCCESS,
        quiz
    }
}

export function fetchQuizesError(err) {
    return {
        type: FETCH_QUIZES_ERROR,
        err
    }
}