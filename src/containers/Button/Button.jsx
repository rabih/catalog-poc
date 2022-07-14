import React from 'react'

function Button(props) {
    return (
        <div className={props.class}>
            <button>{props.text}</button>
        </div>
    )
}

export default Button
