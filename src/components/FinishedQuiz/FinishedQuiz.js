import React from 'react'
import style from './FinishedQuiz.module.css'

const FinishedQuiz = props => {
    return (
        <div className={style.FinishedQuiz}>
            <ul>
                <li>
                    <strong>1. </strong>
                    How are you
                    <i className={'fa fa-times ' + style.error}></i>
                </li>
                <li>
                    <strong>2. </strong>
                    How are you
                    <i className={'fa fa-check ' + style.success}></i>
                </li>
            </ul>

            <p>Correct answers: 4 from 10</p>

            <div>
                <button>Retry</button>
            </div>
        </div>
    )
}

export default FinishedQuiz