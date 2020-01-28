import React, {Component} from "react";
import style from './Quiz.module.css'
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";

class Quiz extends Component {
    state = {
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
        const question = this.state.quiz[this.state.activeQuiz];

        if (question.rightAnswerId === answerId) {

            this.setState({
                answerState: {[answerId]: 'success'}
            })

            const timeOut = window.setTimeout(() => {
                if (this.isQuizFinished()) {

                } else {
                    this.setState({
                        activeQuiz: this.state.activeQuiz + 1,
                        answerState: null
                    })
                }

                window.clearTimeout(timeOut)
            }, 1000)
        } else {
            this.setState({
                answerState: {[answerId]: 'error'}
            })
        }
    }

    isQuizFinished() {
        return this.state.activeQuiz + 1 === this.state.quiz.length;
    }

    render() {
        return (
            <div className={style.Quiz}>
                <div className={style.QuizWrapper}>
                    <h1>Please, answer to all questions</h1>
                    <ActiveQuiz
                        answers={this.state.quiz[this.state.activeQuiz].answers}
                        question={this.state.quiz[this.state.activeQuiz].question}
                        onAnswerClick={this.onAnswerClickHandler}
                        quizLength={this.state.quiz.length}
                        answerNumber={this.state.activeQuiz + 1}
                        state={this.state.answerState}
                    />
                </div>
            </div>
        )
    }
}


export default Quiz