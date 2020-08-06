import React, {Component} from 'react';
import style from './QuizCreator.module.css'
import Button from '../../components/UI/Button/Button';
import {createControl} from '../../shared/FormControlBuilder'
import Input from "../../components/UI/input/Input";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";

function createOptionControl(num) {
    return createControl(createControl({
        id: num,
        label: `Option ${num}`,
        errorMessage: `The value can't be empty`
    }, {required: true}))
}

function createFormControls() {
    return {
        question: createControl({
            label: 'Input a question',
            errorMessage: `The question can't be empty`
        }, {required: true}),
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4),
    }
}

export default class QuizCreator extends Component {

    state = {
        quiz: [],
        formControls: createFormControls()
    }

    submitHandler = event => {
        event.preventDefault()
    }

    addQuestionHandler = () => {

    }

    createQuizHandler = () => {

    }

    changeHandler = (value,controlName) => {

    }

    renderControls() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName]

            return (
                <Auxiliary key={controlName + index}>
                    <Input
                        label={control.label}
                        value={control.value}
                        valid={control.valid}
                        shouldValidate={!!control.validation}
                        touched={control.touched}
                        errorMessage={control.errorMessage}
                        onChange={event => this.changeHandler(event.target.value, controlName)}
                    />

                    { index === 0 ? <hr/> : null }
                </Auxiliary>
            )
        })
    }

    render() {
        return (
            <div className={style.QuizCreator}>
                <div>
                    <h1>Quiz Creat</h1>

                    <form onSubmit={this.submitHandler}>

                        { this.renderControls() }

                        <select></select>

                        <Button
                            type="primary"
                            onClick={this.addQuestionHandler}
                        >Add question</Button>
                        <Button
                            type="success"
                            onClick={this.createQuizHandler}
                        >Create Quiz</Button>

                    </form>
                </div>
            </div>
        )
    }
}