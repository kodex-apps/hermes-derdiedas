import { React, useState, useEffect, useRef } from "react";
import "./lobby.css";
import Button from "../components/button";
import PlayerList from "../components/lobby.playerlist";
import getUsername from "../utils/getusername";
import PopupName from "../components/popup.name";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import dataService from '../utils/dataservice.js';
import getPlayerObject from '../utils/getplayerobject.js';

/* 
The match Lobby should be where you see the player list and can click SPIEL STARTEN 
*/
const Lobby = (props) => {
	const {matchId} = useParams();
	const { state } = useLocation();
	// localStorage variable to store the playerName
	const lsPlayerName = localStorage.getItem('playerName');
	// We get an array containing the player's last Match and his Id in it. Later on, if they match, the player will be assigned that match and id should they reload
	const lsPlayerId = localStorage.getItem('playerIdArray') || '0-0';
	// playerName is props.playerName so it can be attached when loading the lobby again after a match, if the playerName is unassigned that's when getUsername is called and a name is assigned
	// if state is null, we get lsPlayerName which is the localStorage
	const [playerName, setPlayerName] = useState(state ? state.playerObject.name : null);
	const [showDialog, setShowDialog] = useState(false);
	const [loadedMatch, setLoadedMatch] = useState({playerList: []});
	const [buttonName, setButtonName] = useState("SPIEL STARTEN");
	const foundDuplicatePlayerIds = useRef(false);
	let oldPlayerName = playerName;
	const navigate = useNavigate();

	//TODO: Popup that asks for the player's name
	useEffect(() => {
		let done = false;
		if (!done) {
		dataService.get(matchId)
			.then((response) => response.json())
			.then((response) => {
				// Local playerName variable so we have an updated value for subsequent ops
				let localPlayerName = playerName;
				let playerObject;
				// If the localStorage match-id fits with a player in this lobby, assign our playerName to it
				// else if the playerName exists but the match-id doesn't fit, assign a new one
				// else if we don't have any playerName at all, assign a new one
				const localPlayerIdArray = lsPlayerId.split('-');
				const localPlayerId = parseInt(localPlayerIdArray[1]);
				const localPlayerMatch = parseInt(localPlayerIdArray[0]);
				if (((localPlayerMatch === response._id) && (response.playerList.some(element => (element.name === lsPlayerName) && (element.id === localPlayerId)))) || ((localPlayerMatch != 0) && (!response.playerList.some(element => lsPlayerName === element.name)))) {
					localPlayerName = lsPlayerName; 
					setPlayerName(localPlayerName);
				}
				else if (!localPlayerName) {
					localPlayerName = getUsername(response.playerList);
					setPlayerName(localPlayerName);
					localStorage.setItem('playerName', localPlayerName);
				}
				// If there is no playerList present, make own player owner
				if (response.playerList.length === 0) {
					playerObject = {
						name: localPlayerName,
						isOwner: true,
						wordsCompleted: 0,
						score: 0,
						hasPlayed: false,
					}
					// This is (presumably) so new players don't get thrown into an already running match. COmmenting out because if a match has no players it's impossible it's onGoing
					// if (response.isOngoing) playerObject.hasPlayed = true;

					console.log('Adding new player');
					return dataService.addPlayer(matchId, playerObject);
				} 
				// If there is a playerList and the playerName doesn't appear, add him
				else if ((response.playerList.findIndex(e => e.name === localPlayerName)) === -1) {
					playerObject = {
						name: localPlayerName,
						wordsCompleted: 0,
						score: 0,
						hasPlayed: false,
					}
					if (response.isOngoing) playerObject.hasPlayed = true;
					return dataService.addPlayer(matchId, playerObject);
				}
				console.log('First render non promise data');
				console.log(response);
				setLoadedMatch(response);
			})
			.then((data) => data.json())
			.then((data) => {
				console.log('First render promise data');
				console.log(data);
				setLoadedMatch(data);
			})
			// On error just send the player to a new match
			.catch((err) => {
				if (err.status === 404) {
					navigate(`/`);
					console.log(err);
				}
			});
		}

		return () => { 
			done = true;
		}
	},[]);

	useEffect(() => {
		console.log("localStorage useEffect loadedMatch with length" + loadedMatch.playerList.length);
		console.log(loadedMatch);
		if (loadedMatch.playerList.length > 0) {
			localStorage.setItem('playerIdArray', `${matchId}-${loadedMatch.playerList.find(e => e.name === playerName).id}`);
		}
	}, [loadedMatch]);



	// useEffect to set up the setInterval every time the playerName changes
	useEffect(() => {
		let finished = false;
		let intervalId;

		if (!finished) {
			intervalId = setInterval(updateMatch, 3000, getPlayerObject);
		}

		return () => {
			finished = true;
			clearInterval(intervalId);
		}
	// TODO: Why tf does this list playerName and loadedMatch as a dependency?
	}, [playerName, loadedMatch]);

	// Check for duplicates if the the variable is set to true
	//useEffect(() => 
	//	{
	//		if (foundDuplicatePlayerIds) dataService.checkMatch(matchId);
	//	}, [foundDuplicatePlayerIds]); 

	const startMatch = (e) => {
		setButtonName("LADEN...");
		dataService.startMatch(loadedMatch._id)
			.catch(e => console.log(e));
			}
	
	const changeUserName = (newUserName) => {
		if (loadedMatch.playerList.length > 0) {
			let newPlayerObject = getPlayerObject(loadedMatch, playerName);
			newPlayerObject.name = newUserName;
			setPlayerName(newUserName);
			localStorage.setItem('playerName', newUserName);
			dataService.updatePlayer(matchId, oldPlayerName, 1, newUserName);
			oldPlayerName = newUserName;
		}
	}

	// Check the match for duplicate player IDs every time it is updated
	// function to update the match data with the latest one
	const updateMatch = (getPlayerObject) => {
		dataService.get(matchId)
			.then((response) => response.json())
			.then(match => {
				//setLoadedMatch(match);
				let matchPlayerIds = [];
				match.playerList.forEach(e => {
					if (matchPlayerIds.includes(e.id)) foundDuplicatePlayerIds.current = true;
					matchPlayerIds.push(e.id);
				});
				if (match.isOngoing && !getPlayerObject(match, playerName).hasPlayed) {
					const playerObject = getPlayerObject(match, playerName) || undefined;
					console.log(`Sending player ${playerObject.name} with wordsCompleted ${playerObject.wordsCompleted}, hasPlayed = ${playerObject.hasPlayed} and a score of ${playerObject.score}`);
					navigate(`/spiel/${match._id}`, { state: { playerObject: getPlayerObject(match, playerName) } });
				}
				if (foundDuplicatePlayerIds) dataService.checkMatch(matchId);
				else setLoadedMatch(match);
			})
			.then((data) => data.json())
			.then(data => {
				console.log('Update match promise data');
				console.log(data);
				setLoadedMatch(data);
			})
			/* Commenting out to try and put this somewhere else
			 * .then(() => {
			*	if (foundDuplicateId) {
			*		dataService.checkMatch(matchId);
			*	}
			})*/
		.then((data) => data.json())
			.catch(e => console.log(e));
	}

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
		{loadedMatch.playerList.length > 0 ? (<div className="playerlist">
					<PlayerList
						playerList={loadedMatch.playerList}
						playerName={playerName}
						setShowDialog={setShowDialog}
					/>
				</div>) : (<h1>Laden...</h1>)}
				{loadedMatch.playerList.some((e) => e.name === playerName && e.isOwner) && (
					<div className="start-game">
							<Button onClick={startMatch}>{buttonName}</Button>
					</div>
				)}
			</div>
		</>
	);
};

export default Lobby;
