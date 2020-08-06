import React from 'react';
import style from './Input.module.css'

function isInvalid({valid, touched, shouldValidate}){
    return !valid && shouldValidate && touched
}

const Input = props => {
    const inputType = props.type || 'text';
    const cls = [style.Input];

    if (isInvalid(props)) {
        cls.push(style.Invalid)
    }

    return (
        <div className={cls.join(' ')}>
            <label htmlFor={props.inputId}>{props.label}</label>
            <input
                type={inputType}
                id={props.inputId}
                value={props.value}
                onChange={props.onChange}
            />
            {
                isInvalid(props)
                    ? <span className={style.ErrorMessage}>{props.errorMessage}</span>
                    : null
            }

        </div>
    )
}

export default Input;