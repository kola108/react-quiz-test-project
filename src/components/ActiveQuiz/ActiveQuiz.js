import React from 'react'
import style from './ActiveQuize.module.css'
import AnswersList from "./AnswersList/AnswersList";

const ActiveQuiz = props => (
    <div className={style.ActiveQuiz}>
        <p className={style.Question}>
            <span>
                <strong>{props.answerNumber}.</strong>&nbsp;
                {props.question}
            </span>

            <small>{props.answerNumber} from {props.quizLength}</small>
        </p>

        <AnswersList
            state={props.state}
            answers={props.answers}
            onAnswerClick={props.onAnswerClick}
        />
    </div>
)

export default ActiveQuiz