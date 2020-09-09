import React, {Component} from 'react';
import {Link} from "react-router-dom";
import style from './QuizList.module.css'
 import Loader from '../../components/UI/loader/Loader'
import { connect } from "react-redux";
import { fetchQuizes } from "../../store/actions/quiz"

class QuizList extends Component {
    renderQuizez() {
        return this.props.quizes.map((quiz) => {
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

    componentDidMount() {
        this.props.fetchQuizes()
    }

    render() {
        return (
            <div className={style.QuizList}>
                <div>
                    <h1>Quiz List</h1>
                    {
                        this.props.loading && this.props.quizes.length !== 0
                            ? <Loader/>
                            : <ul>{ this.renderQuizez() }</ul>
                    }

                </div>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        quizes: state.quiz.quizes,
        loading: state.quiz.loading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizes: () => dispatch(fetchQuizes())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList)