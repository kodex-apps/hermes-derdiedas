import React from 'react';
import './root.css';

// The first page users will be in when they load it, it will handle creating a match for the and sending them down a match route
const Root = props => {
    return (
        <div className="main-container">
            {props.children}
        </div>
        )
}

export default Root;