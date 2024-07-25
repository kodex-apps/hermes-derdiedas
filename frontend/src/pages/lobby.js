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
	const [playerName, setPlayerName] = useState(getUsername(matchId));
	const [showDialog, setShowDialog] = useState(false);
	const [playerList, setPlayerList] = useState([]);
	const [loadedMatch, setLoadedMatch] = useState({playerList: [{playerName: "Laden...", placement: 1, isOwner: false}]});
	let oldPlayerName = playerName;

	//TODO: Popup that asks for the player's name
	useEffect(() => {
		dataService.get(matchId)
			.then((response) => response.json())
			.then((response) => {
				console.log(response);
				setLoadedMatch(response);
				//TODO: Commented out until playerList is configured properly in backend
				//setPlayerList(response.playerList); 
			});
	},[]);
	
	const changeUserName = (newUserName) => {
		loadedMatch.playerList.forEach((playerElement) => {
			if (playerElement.name === oldPlayerName) {
				//TODO: Remove fetchedPlayerList from here since it's a placeholder var
				fetchedPlayerList[fetchedPlayerList.indexOf(playerElement)].name =
					newUserName;
				oldPlayerName = newUserName;
				setPlayerName(newUserName);
				setPlayerList(fetchedPlayerList);
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
