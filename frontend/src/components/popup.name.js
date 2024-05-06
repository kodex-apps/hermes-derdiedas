import React, { useEffect, useRef } from "react";
import Button from "./button";
import './popup.name.css';

const PopupName = (props) => {
	const inputRef = useRef(null);
	// Set focus on the input as soon as PopupName renders
	useEffect(() => {
		inputRef.current.focus();
	});
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
						onChange={(e) =>
							props.setUserName(
								e.target.value ? e.target.value : props.originalName,
							)
						}
					/>
					<br />
					<br />
					<Button
						onClick={() => {
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
