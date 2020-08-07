import React, {Component} from "react";
import style from './Quiz.module.css'
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import axios from "../../shared/axios-quiz"
import Loader from "../../components/UI/loader/Loader"

class Quiz extends Component {
    state = {
        results: {},
        isFinished: false,
        activeQuiz: 0,
        answerState: null,
        quiz: [],
        loading: true
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

    async componentDidMount() {
        try {
            const response = await axios.get(`quiz/${this.props.match.params.id}.json`)
            const quiz = response.data

            this.setState({
                quiz,
                loading: false
            })
        } catch (e) {
            console.error(e)
        }
    }

    render() {
        return (
            <div className={style.Quiz}>
                <div className={style.QuizWrapper}>
                    <h1>Please, answer to all questions</h1>

                    {
                        this.state.loading
                            ? <Loader />
                            : this.state.isFinished ?
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