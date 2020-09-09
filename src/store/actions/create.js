import {
    CREATE_QUIZ_QUESTION,
    RESET_QUIZ_CREATION
} from "./actionTypes";
import axios from "../../shared/axios-quiz";

export function createQuizQuestion(item) {
    return {
        type: CREATE_QUIZ_QUESTION,
        item
    }
}

export function finishCreateQuiz() {
    return async (dispatch, getState) => {
        const state = getState()

        await axios.post('quiz.json', state.create.quiz)
        resetQuizCreation()
    }
}

export function resetQuizCreation() {
    return {
        type: RESET_QUIZ_CREATION
    }
}