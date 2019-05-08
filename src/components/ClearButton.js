import React from 'react'
import './ClearButton.css'

export const ClearButton = (props) => (
    <div className={`clear-button ${props.position}`} onClick={props.handleClear}>
        {props.children}
    </div>
)