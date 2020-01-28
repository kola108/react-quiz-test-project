import React from 'react'
import style from './AnswerItem.module.css'

const AnswerItem = props => {
    return (
        <li
            className={style.AnswerItem}
            onClick={() => props.onAnswerCLick(props.answer.id)}
        >
            { props.answer.text }
        </li>
    )
}

export default AnswerItem

