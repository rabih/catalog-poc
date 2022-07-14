import React from 'react'
import './Button.css'

function Button(props) {

    return (
        <>
            <button type="button" className="Button" id={props.class}>{props.text}</button>
        </>
    )
}

export default Button
