import React from "react";
import "./lobby.share.css";

const Share = (props) => {
	// Return a button tag with the whatever text is between the tags and the onClick callback passed as an argument
	return (
		<button onClick={props.onClick} className="share">
			{props.children}
		</button>
	);
};

export default Share;
