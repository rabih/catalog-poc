import React from 'react'
import './Button.css'

function Button(props) {

    return (
        <>
            <button type="button" onClick={props.action} className={`${props.class} Button`} >{props.text}</button>
        </>
    )
}

export default Button
