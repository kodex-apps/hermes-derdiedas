import React from 'react';
import './match.textbox.css';

const TextBox = props => {
	return <input 	onChange={props.onChange} 
			alt="Article Text Box" 
			autoFocus 
			type="text" 
			size="3" 
			className="article-textbox"/>;
}

export default TextBox;
