import React from 'react'
import style from './FinishedQuiz.module.css'
import Button from '../UI/Button/Button'
import {Link} from "react-router-dom";

const FinishedQuiz = props => {
    const successCount = Object.keys(props.results).reduce((total, key) => {
        if (props.results[key] === 'success') {
            total++
        }
        return total
    }, 0)

    return (
        <div className={style.FinishedQuiz}>
            <ul>
                { props.quize.map((quizItem, index) => {
                    const cls = [
                        'fa',
                        props.results[quizItem.id] === 'error' ? 'fa-times' : 'fa-check',
                        style[props.results[quizItem.id]]
                    ];
                    
                    return (
                        <li key={index}>
                            <strong>{index + 1}</strong>. &nbsp;
                            {quizItem.question}
                            <i className={cls.join(' ')} />
                        </li>
                    )
                }) }
            </ul>

            <p>Correct answers: {successCount} from {props.quize.length}</p>

            <div>
                <Button onClick={props.onRetry} type='primary'>Retry</Button>
                <Link to={'/'}>
                    <Button type='success'>Go to the list of Quiz</Button>
                </Link>
            </div>
        </div>
    )
}

export default FinishedQuiz