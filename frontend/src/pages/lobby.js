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
	// playerName is props.playerName so it can be attached when loading the lobby again after a match, if the playerName is unassigned that's when getUsername is called and a name is assigned
	// if state is null, we get lsPlayerName which is the localStorage
	const [playerName, setPlayerName] = useState(state ? state.playerObject.name : lsPlayerName);
	const [showDialog, setShowDialog] = useState(false);
	const [loadedMatch, setLoadedMatch] = useState({playerList: []});
	const [buttonName, setButtonName] = useState("SPIEL STARTEN");
	let oldPlayerName = playerName;
	const navigate = useNavigate();

	//TODO: Popup that asks for the player's name
	useEffect(() => {
		let done = false;
		if (!done) {
		dataService.get(matchId)
			.then((response) => response.json())
			.then((response) => {
				let matchWasModified = false;
				// Local playerName variable so we have an updated value for subsequent ops
				let localPlayerName = playerName;
				let playerObject;
				setLoadedMatch(response);
				if (!localPlayerName) {
					localPlayerName = getUsername(response.playerList);
					setPlayerName(localPlayerName);
					localStorage.setItem('playerName', localPlayerName);
				}
				// If there is no playerList present, make own player owner
				if (response.playerList.length === 0) {
					playerObject = {
						id: 0,
						name: localPlayerName,
						isOwner: true,
						wordsCompleted: 0,
						score: 0,
						hasPlayed: false,
					}
					if (response.isOngoing) playerObject.hasPlayed = true;
					// It shouldn't really matter to push to this current playerList our playerObject since that's handled in the backend, but cba to touch anything
					response.playerList.push(playerObject);
					matchWasModified = true;
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
					response.playerList.push(playerObject);
					matchWasModified = true;
				}
				if (matchWasModified) {
					dataService.update(playerObject, response._id)
						.then((response2) => setLoadedMatch(response));
				}
			})
			.catch((err) => {
				navigate(`/`);
			});
		}

		return () => { 
			done = true;
		}
	},[]);

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
	}, [playerName, loadedMatch]);

	const startMatch = (e) => {
		setButtonName("LADEN...");
		dataService.startMatch(loadedMatch._id)
			.catch(e => console.log(e));
			}
	
	// BROKEN! TODO: Update this function with the correct variable
	const changeUserName = (newUserName) => {
		if (loadedMatch.playerList.length > 0) {
			let newPlayerObject = getPlayerObject(loadedMatch, playerName);
			newPlayerObject.name = newUserName;
			setPlayerName(newUserName);
			localStorage.setItem('playerName', newUserName);
			dataService.update(newPlayerObject, matchId);
			oldPlayerName = newUserName;
		}
	}

	// function to update the match data with the latest one
	const updateMatch = (getPlayerObject) => {
		dataService.get(matchId)
			.then((response) => response.json())
			.then(match => {
				setLoadedMatch(match);
				if (match.isOngoing && !getPlayerObject(match, playerName).hasPlayed) {
					navigate(`/spiel/${match._id}`, { state: { playerObject: getPlayerObject(match, playerName) } });
				}
			})
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
				<div className="playerlist">
					<PlayerList
						playerList={loadedMatch.playerList}
						playerName={playerName}
						setShowDialog={setShowDialog}
					/>
				</div>
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
