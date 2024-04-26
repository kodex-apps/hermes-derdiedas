import React from "react";
import "./button.css";

const Button = (props) => {
	// Return a button tag with the whatever text is between the tags and the onClick callback passed as an argument
	return (
		<button onClick={props.onClick} className="button">
			{props.children}
		</button>
	);
};

export default Button;
