import React from "react";
import { useParams } from "react-router-dom";
import "./lobby.playerlist.element.css";
import editIcon from "../img/edit.png";
import deleteIcon from "../img/delete.png";
import dataService from "../utils/dataservice.js";

/* 
A playerlist element is composed of a name to the left side, a winPercentage number if there is one (don't have one at the stat),
an edit button in case you want to edit your name
*/
const PlayerListElement = (props) => {
	// Get the matchId property from the URL
	const {matchId} = useParams();
	// Function to show the PopupName dialog, state variable function is passed in the props
	const showDialog = () => {
		props.setShowDialog(true);
	};

	// Function that will show the score unless the player hasn't wordsCompleted = 10, then it'll show that he's still playing
	function showScore(playerElement) {
		console.log("showScore working with:");
		console.log(playerElement);
		if (playerElement.wordsCompleted < 10) {
			console.log("less than 10 words in playerElement");
			return '...';
		}
		else {
			console.log("10 words or more in playerEALement");
			return playerElement.score;
		}
	}

	const handleKick = (e) => {
		dataService.removePlayer(matchId, e.target.id)
			.then(data => console.log(data));
	}


	// TODO: Add a delete button (if you're the owner, maybe pass as a prop your player name and check if isOwner)
	return (
		<tr className="PLE">
			<td className="PLE__name">
				{props.playerElement.name}
				{props.userName === props.playerElement.name && (
					<div className="PLE__edit">
						&nbsp;
						<img
							alt="Edit Button"
							className="PLE__img--edit"
							src={editIcon}
							onClick={showDialog}
						/>
					</div>
				)}
			</td>
			<td className="PLE__score">{props.playerElement.hasPlayed ? props.playerElement.score+'/10' : '...'}</td>
			{props.playerList.some((e) => e.name === props.userName && e.isOwner) && (
				<td className="PLE__delete">
					<img
						alt="Delete Button"
						className="PLE__img--delete"
						id={props.id}
						src={deleteIcon}
						onClick={handleKick}
					/>
				</td>
			)}
		</tr>
	);
};

export default PlayerListElement;
