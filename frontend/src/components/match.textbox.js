import React from "react";
import "./match.textbox.css";

const TextBox = (props) => {
	return (
		<input
			ref={props.articleInputRef}
			onChange={props.onChange}
			alt="Article Text Box"
			autoFocus
			type="text"
			size="2"
			className="article-textbox"
		/>
	);
};

export default TextBox;
