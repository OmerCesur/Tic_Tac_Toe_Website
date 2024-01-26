import React from "react";

function Button(props) {
    return <button className="gameButton" id={props.id} onClick={props.onClick}>{props.value}</button>
}

export default Button;