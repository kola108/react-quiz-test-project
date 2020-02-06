import React from 'react'
import style from './FinishedQuiz.module.css'

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
                    ]

                    //debugger

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
                <button onClick={props.onRetry}>Retry</button>
            </div>
        </div>
    )
}

export default FinishedQuiz