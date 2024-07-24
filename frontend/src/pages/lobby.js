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
	// TODO: Set up how the playerName is assigned, we can't really pass the playerName through a prop since we're sending players here through a route, so maybe if there is only one player, assign this player that name, and starting from the second player begin adding them as a non-owner
	const [playerName, setUserName] = useState(props.playerName ?? getUsername(matchId));
	const [showDialog, setShowDialog] = useState(false);
	const [playerList, setPlayerList] = useState([]);
	const [loadedMatch, setLoadedMatch] = useState({playerList: [{playerName: "Laden...", placement: 1, isOwner: false}]});
	let oldPlayerName = playerName;

	//TODO: Popup that asks for the player's name
	//TODO: Add useEffect once loaded to load the match in the url (once HttpProvider is created)
	useEffect(() => {
		const handleLoad = () => {
			dataService.get(matchId)
				.then((response) => response.json())
				.then((response) => {
					console.log(response);
					setLoadedMatch(response);
					//TODO: Commented out until playerList is configured properly in backend
					//setPlayerList(response.playerList); 
				});
		}
		window.addEventListener('load', handleLoad);
		return () => window.removeEventListener('load', handleLoad);
	},[]);
	
	const changeUserName = (newUserName) => {
		loadedMatch.playerList.forEach((playerElement) => {
			if (playerElement.name === oldPlayerName) {
				//TODO: Remove fetchedPlayerList from here since it's a placeholder var
				fetchedPlayerList[fetchedPlayerList.indexOf(playerElement)].name =
					newUserName;
				oldPlayerName = newUserName;
				setUserName(newUserName);
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
						playerList={loadedMatch.playerList ?? null}
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
