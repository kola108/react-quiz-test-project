import React from 'react'
import style from './AnswerItem.module.css'

const AnswerItem = props => {
    const classes = [style.AnswerItem]

    if (props.state) {
        classes.push(style[props.state])
    }

    return (
        <li
            className={classes.join(' ')}
            onClick={() => props.onAnswerCLick(props.answer.id)}
        >
            { props.answer.text }
        </li>
    )
}

export default AnswerItem

