import React, {Component} from "react";
import style from './Quiz.module.css'
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";

class Quiz extends Component {
    state = {
        results: {}, // {[id]: success}
        isFinished: false,
        activeQuiz: 0,
        answerState: null, // { [id]: 'success', 'error' }
        quiz: [
            {
                id: 1,
                question: 'What color is the sky?',
                rightAnswerId: 2,
                answers: [
                    { id: 1, text: 'Black'},
                    { id: 2, text: 'Blue'},
                    { id: 3, text: 'Light blue'},
                    { id: 4, text: 'Red'}
                ]
            },
            {
                id: 2,
                question: 'What color is the ground?',
                rightAnswerId: 3,
                answers: [
                    { id: 1, text: 'Black'},
                    { id: 2, text: 'Green'},
                    { id: 3, text: 'Brown'},
                    { id: 4, text: 'Red'}
                ]
            }
        ]
    }

    onAnswerClickHandler = (answerId) => {
        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0]
            if (this.state.answerState[key] === 'success') {
                return
            }
        }

        const question = this.state.quiz[this.state.activeQuiz];
        const results = this.state.results;

        if (question.rightAnswerId === answerId) {
            if (!results[question.id]) {
                results[question.id] = 'success'
            }

            this.setState({
                answerState: {[answerId]: 'success'},
                results
            })

            const timeOut = window.setTimeout(() => {
                if (this.isQuizFinished()) {
                    this.setState({isFinished: true})
                } else {
                    this.setState({
                        activeQuiz: this.state.activeQuiz + 1,
                        answerState: null
                    })
                }

                window.clearTimeout(timeOut)
            }, 1000)
        } else {
            results[question.id] = 'error';
            this.setState({
                answerState: {[answerId]: 'error'},
                results
            })
        }
    }

    isQuizFinished() {
        return this.state.activeQuiz + 1 === this.state.quiz.length;
    }

    onRetryHandler = () => {
        this.setState({
            activeQuiz: 0,
            answerState: null,
            isFinished: false,
            results: {}
        })
    }

    render() {
        return (
            <div className={style.Quiz}>
                <div className={style.QuizWrapper}>
                    <h1>Please, answer to all questions</h1>
                    {
                        this.state.isFinished ?
                            <FinishedQuiz
                                results = {this.state.results}
                                quize = {this.state.quiz}
                                onRetry = {this.onRetryHandler}
                            />
                             : <ActiveQuiz
                                answers={this.state.quiz[this.state.activeQuiz].answers}
                                question={this.state.quiz[this.state.activeQuiz].question}
                                onAnswerClick={this.onAnswerClickHandler}
                                quizLength={this.state.quiz.length}
                                answerNumber={this.state.activeQuiz + 1}
                                state={this.state.answerState}
                            />
                    }

                </div>
            </div>
        )
    }
}


export default Quiz