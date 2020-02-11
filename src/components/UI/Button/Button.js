import React from 'react'
import style from './Button.module.css'

const Button = props => {
    const cls = [
        style.Button,
        style[props.type]
    ]

    console.log({cls, result: cls.join(''), props})

    return (
        <button
            onClick={props.onClick}
            className={cls.join(' ')}
            disabled={props.disabled}
        >
            {props.children}
        </button>
    )
}

export default Button;