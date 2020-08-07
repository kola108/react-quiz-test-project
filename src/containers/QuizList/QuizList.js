import React, {Component} from 'react';
import {Link} from "react-router-dom";
import style from './QuizList.module.css'
import axios from '../../shared/axios-quiz'
import Loader from '../../components/UI/loader/Loader'

export default class QuizList extends Component {

    state = {
        quizes: [],
        loading: true,
    }

    renderQuizez() {
        return this.state.quizes.map((quiz) => {
            return (
                <li
                    key={quiz.id}
                >
                    <Link to={'/quiz/' + quiz.id}>
                        {quiz.name}
                    </Link>
                </li>
            )
        })
    }

    async componentDidMount() {
        try {
            const response = await axios.get('quiz.json')

            const quizes = []

            Object.keys(response.data).forEach((key, index) => {
                quizes.push({
                    id: key,
                    name: `Test number ${index + 1}`
                })
            })

            this.setState({ quizes, loading: false })
        } catch (err) {
            console.error(err)
        }
    }

    render() {
        return (
            <div className={style.QuizList}>
                <div>
                    <h1>Quiz List</h1>
                    {
                        this.state.loading
                            ? <Loader/>
                            : <ul>{ this.renderQuizez() }</ul>
                    }

                </div>
            </div>
        )
    }
}