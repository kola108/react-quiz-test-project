import React from 'react'
import style from './Select.module.css'

const Select = props => {
    return (
        <div className={style.Select}>
            <label htmlFor={props.selectId}>{props.label}</label>
            <select
                id={props.selectId}
                value={props.value}
                onChange={props.onChange}
            >
                { props.options.map((option, index) => {
                    return (
                        <option
                            value={option.value}
                            key={option.value + index}
                        >
                            {option.text}
                        </option>
                    )
                })}
            </select>
        </div>
    )
}

export default Select