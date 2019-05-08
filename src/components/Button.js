import React from 'react'
import './Button.css'

export const Button = props => (
    <div
        className={`button-wrapper ${!isNaN(props.children) || props.children === "." || props.children === "="? null : "operator"}`}
        onClick={() => props.handleClick(props.children)}>
        {props.children}
    </div>
)
