import React, {Component} from 'react';
import {Link} from "react-router-dom";
import style from './QuizList.module.css'

export default class QuizList extends Component {

    renderQuizez() {
        return [1, 2, 3].map((quiz, index) => {
            return (
                <li
                    key={index}
                >
                    <Link to={'/quiz/' + quiz}>
                        Test {quiz}
                    </Link>
                </li>
            )
        })
    }

    render() {
        return (
            <div className={style.QuizList}>
                <div>
                    <h1>Quiz List</h1>
                    <ul>
                        { this.renderQuizez() }
                    </ul>
                </div>
            </div>
        )
    }
}