import { React, useState, useEffect } from "react";
import "./lobby.css";
import Button from "../components/button";
import PlayerList from "../components/lobby.playerlist";
import getUsername from "../utils/getusername";
import PopupName from "../components/popup.name";
import { Link, useParams } from "react-router-dom";
import dataService from '../utils/dataservice.js';

// Placeholder variable for playerList. This playerList is a frozen version of the state variable version, every time the latter changes it will have this as a reference of what it used to look like. Mainly using this so players can change their username
const fetchedPlayerList = [
	{
		placement: 3,
		name: "Lorenz",
		winPercentage: null,
		isOwner: true,
	},
	{
		placement: 2,
		name: "Super super long name aaaa",
		winPercentage: "90%",
		isOwner: false,
	},
	{
		placement: 1,
		name: "Fefran",
		winPercentage: "60%",
		isOwner: false,
	},
];

/* 
The match Lobby should be where you see the player list and can click SPIEL STARTEN (TBD) 
*/
const Lobby = (props) => {
	// Should be useState(getUsername(playerList)) but we're using a placeholder for testing purposes
	const {matchId} = useParams();
	// TODO: One solution would be to create matches with no Player in playerList, that way the first person to join (which would have to be the owner) would get isOwner: true, any subsequent users would get normal Players. getUsername might have to be modified to adjust since its version is old.
	// playerName is props.playerName so it can be attached when loading the lobby again after a match, if the playerName is unassigned that's when getUsername is called and a name is assigned
	const [playerName, setPlayerName] = useState(props.playerName);
	const [showDialog, setShowDialog] = useState(false);
	const [loadedMatch, setLoadedMatch] = useState({playerList: [{playerName: "Laden...", placement: 1, isOwner: false}]});
	let oldPlayerName = playerName;

	//TODO: Popup that asks for the player's name
	useEffect(() => {
		let done = false;
		if (!done) {
		dataService.get(matchId)
			.then((response) => response.json())
			.then((response) => {
				let matchWasModified = false;
				console.log(response);
				setLoadedMatch(response);
				if (!playerName) setPlayerName(getUsername(response.playerList));
				// If there is no playerList present, make own player owner
				if (!response.playerList) {
					response.playerList.push({
						name: playerName,
						isOwner: true
					});
					matchWasModified = true;
				} 
				// If there is a playerList and the playerName doesn't appear, add him
				else if ((response.playerList.findIndex(e => e.name === playerName)) === -1) {
					response.playerList.push({
						name: playerName
					});
					matchWasModified = true;
				}
				if (matchWasModified) {
					dataService.update(response)
						.then((response2) => setLoadedMatch(response));
				}
			});
		}

		return () => { done = true; }
	},[]);
	
	const changeUserName = (newUserName) => {
		loadedMatch.playerList.forEach((playerElement) => {
			if (playerElement.name === oldPlayerName) {
				//TODO: Remove fetchedPlayerList from here since it's a placeholder var
				fetchedPlayerList[fetchedPlayerList.indexOf(playerElement)].name =
					newUserName;
				oldPlayerName = newUserName;
				setPlayerName(newUserName);
				// Commented out since setPlayerList is deprecated, it's better to get the match, modify the playerList, and update that state
				//setPlayerList(fetchedPlayerList);
			}
		});
	};
	return (
		<>
			<PopupName
				setUserName={changeUserName}
				showDialog={showDialog}
				setShowDialog={setShowDialog}
				originalName={oldPlayerName}
				playerList={loadedMatch.playerList}
			/>
			<div className="room">
				<div className="playerlist">
					<PlayerList
						playerList={loadedMatch.playerList}
						playerName={playerName}
						setShowDialog={setShowDialog}
					/>
				</div>
				{loadedMatch.playerList.some((e) => e.name === playerName && e.isOwner) && (
					<div className="start-game">
						<Link to={`/spiel/${loadedMatch._id}`}>
							<Button>SPIEL STARTEN</Button>
						</Link>
					</div>
				)}
			</div>
		</>
	);
};

export default Lobby;
