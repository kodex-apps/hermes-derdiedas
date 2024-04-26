import React from "react";
import "./root.css";
import title from "./title_placeholder.png";

// The first page users will be in when they load it, it will handle creating a match for the and sending them down a match route
const Root = (props) => {
	return (
		<div className="main-container">
			<img alt="Title" className="title" src={title} />
			{props.children}
		</div>
	);
};

export default Root;
