import React from 'react';
import style from './AnswersList.module.css'
import AnswerItem from "./AnswerItem/AnswerItem";

const AnswersList = props => (
    <ul className={style.AnswersList}>
        { props.answers.map((answer, index) => {
            return (
             <AnswerItem
                 key={index}
                 answer={answer}
                 onAnswerCLick={props.onAnswerClick}
                 state={props.state ? props.state[answer.id] : null}
             />
            )
        }) }
    </ul>
)

export default AnswersList