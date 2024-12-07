import React, { useState, useEffect, useRef } from "react";
import Button from "./button";
import './popup.name.css';

const PopupName = (props) => {
	const inputRef = useRef(null);
	// Variable to hold the final name the user wants
	const [finalName, setFinalName] = useState('');
	// Set focus on the input as soon as PopupName renders
	useEffect(() => {
		inputRef.current.focus();
	});
	// If the input name is null or if it's already on the list, cancel the change and set the name back to the last saved name
	const handleOnChange = e => {
		setFinalName(e.target.value);
	}

	const handleOnClick = e => {
		if (!props.playerList.find(player => player.name === finalName) && finalName.length < 100) props.setUserName(finalName ? finalName : props.originalName)
		props.setShowDialog(false);
	}


	return (
		<dialog open={props.showDialog}>
			<div style={{ textAlign: "center", whiteSpace: "pre-line" }}>
				<form method="dialog">
					<label>Name</label>
					<br />
					<input
						className="name-textbox"
						ref={inputRef}
						type="text"
						size="8"
						onChange={handleOnChange}
					/>
					<br />
					<br />
					<Button
						onClick={handleOnClick}
					>
						OK
					</Button>
				</form>
			</div>
		</dialog>
	);
};

export default PopupName;
