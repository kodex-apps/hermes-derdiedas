import React, { useEffect, useRef } from "react";
import Button from "./button";

const PopupName = (props) => {
	const inputRef = useRef(null);
	useEffect(() => {
		inputRef.current.focus();
	});
	return (
		<dialog open={props.showDialog}>
			<div style={{ textAlign: "center", whiteSpace: "pre-line" }}>
				<form method="dialog">
					<label>Name:</label>
					<br />
					<input
						ref={inputRef}
						autoFocus="true"
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
