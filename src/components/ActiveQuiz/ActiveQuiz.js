import React from 'react'
import style from './ActiveQuize.module.css'
import AnswersList from "./AnswersList/AnswersList";

const ActiveQuiz = props => (
    <div className={style.ActiveQuiz}>
        <p className={style.Question}>
            <span>
                <strong>2.</strong>&nbsp;
                {props.question}
            </span>

            <small>4 from 12</small>
        </p>

        <AnswersList
            answers={props.answers}
            onAnswerClick={props.onAnswerClick}
        />
    </div>
)

export default ActiveQuiz