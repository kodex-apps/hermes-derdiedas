import React from "react";
import PlayerListElement from "./lobby.playerlist.element";
import "./lobby.playerlist.css";

/* 
The playerlist shows PlayerListElements for each player and ordered according to the placement of each player.
*/
const PlayerList = (props) => {
	// Sort the playerList by placement
	props.playerList.sort((a, b) => {
		if ((a.score < b.score) || (a.score === b.score)) return 1;
		else if (a.score > b.score) return -1;
	});
	//TODO: Add conditional to the table header to show a % column if there is one
	return (
		<table className="playerlist__table">
		<tbody>
			<tr className="playerlist__playernames">
				<th className="playerlist__headerelement">Name</th>
				<th></th>
				<th className="playerlist__headerelement-percentage">Punkte</th>
			</tr>
			{props.playerList.map((playerElement) => (
				<PlayerListElement
					playerList={props.playerList}
					userName={props.playerName}
					playerElement={playerElement}
					setShowDialog={props.setShowDialog}
					lastWordsPerMatch={props.lastWordsPerMatch}
				/>
			))}
		</tbody>
		</table>
	);
};

export default PlayerList;
