import React from "react";
import "./lobby.share.css";
import shareIcon from "../img/share.png";

const Share = (props) => {
	const copyToClipboard = () => {
		navigator.clipboard.writeText(`https://derdiedasspiel.de/${props.matchId}`)
			.then(alert('Link kopiert!'))
			.catch(e => alert(e.message));
	}

	return (
		<div onClick={copyToClipboard} className="share__div">
			<span className="share__span">{props.children}<img className="share__img" src={shareIcon}/></span>	
		</div>
	);
};

export default Share;
