import React, {Component} from "react";
import style from './Quiz.module.css'

class Quiz extends Component {
    state = {
        quiz: []
    }

    render() {
        return (
            <div className={style.Quiz}>
                <h1>Quiz</h1>
            </div>
        )
    }
}


export default Quiz