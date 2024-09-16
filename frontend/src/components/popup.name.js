import React, { useEffect, useRef } from "react";
import Button from "./button";
import './popup.name.css';

const PopupName = (props) => {
	const inputRef = useRef(null);
	// Set focus on the input as soon as PopupName renders
	useEffect(() => {
		inputRef.current.focus();
	});
	// If the input name is null or if it's already on the list, cancel the change and set the name back to the last saved name
	const handleOnChange = e => {
		if (!props.playerList.find(player => player.name === e.target.value)) props.setUserName(e.target.value ? e.target.value : props.originalName)
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
					/>
					<br />
					<br />
					<Button
						onClick={() => {
							handleOnChange();
							props.setShowDialog(false);
						}}
					>
						OK
					</Button>
				</form>
			</div>
		</dialog>
	);
};

export default PopupName;
