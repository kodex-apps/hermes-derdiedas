import React from "react";
import "./button.css";

const Button = (props) => {
	// Return a button tag with the whatever text is between the tags and the onClick callback passed as an argument
	return (
		<button onClick={props.onClick} className="button" disabled={props.disabled}>
			{props.children}
		</button>
	);
};

export default Button;
