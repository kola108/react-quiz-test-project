import React, {Component} from "react";
import style from './Quiz.module.css'
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";

class Quiz extends Component {
    state = {
        quiz: [
            {
                question: 'What color is the sky?',
                rightAnswerId: 2,
                answers: [
                    { id: 1, text: 'Black'},
                    { id: 2, text: 'Blue'},
                    { id: 3, text: 'Light blue'},
                    { id: 4, text: 'Red'}
                ]
            }
        ]
    }

    onAnswerClickHandler = (answerId) => {
        console.log('Answer ID', answerId)
    }

    render() {
        return (
            <div className={style.Quiz}>
                <div className={style.QuizWrapper}>
                    <h1>Please, answer to all questions</h1>
                    <ActiveQuiz
                        answers={this.state.quiz[0].answers}
                        question={this.state.quiz[0].question}
                        onAnswerClick={this.onAnswerClickHandler}
                    />
                </div>
            </div>
        )
    }
}


export default Quiz