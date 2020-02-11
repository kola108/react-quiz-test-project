import React from 'react'
import style from './MenuToggole.module.css'

const MenuToggle = props => {
    const cls = [
        style.MenuToggle,
        'fa'
    ]

    if (props.isOpen) {
        cls.push('fa-times')
        cls.push(style.open)
    } else {
        cls.push('fa-bars')
    }

    return (
        <i
            className={cls.join(' ')}
            onClick={props.onToggle}
        />
    )
}

export default MenuToggle