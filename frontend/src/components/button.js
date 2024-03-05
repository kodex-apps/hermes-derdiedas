import React from 'react';
import './button.css';

const Button = (props) => {
    // Return a button tag with the whatever text is between the tags
    return <button onClick={props.onClick} className="button" role="button">{props.children}</button>
}