import {React, useState} from 'react';
import './lobby.css';
import Button from '../components/button';
import PlayerList from '../components/lobby.playerlist';
import getUsername from '../utils/getusername';
import PopupName from '../components/popup.name';
import PlayernameContext from '../context/playername';

// Placeholder variable for playerList
const playerList = [
    {
        placement: 3,
        name: "Lorenz",
        winPercentage: null,
        isOwner: true
    },
    {
        placement: 2,
        name: "Super super long name aaaa",
        winPercentage: "90%",
        isOwner: false
    },
    {
        placement: 1,
        name: "Jasmine",
        winPercentage: "60%",
        isOwner: false
    }
]

/* 
The match Lobby should be where you see the player list and can click PARTIE STARTEN or SPIEL STARTEN (TBD) 
*/
const Lobby = (props) => {
    const [playerName, setUserName] = useState(getUsername(playerList));
	const [showDialog, setShowDialog] = useState(false);

    return <>
	<PopupName setUserName={setUserName} showDialog={showDialog} setShowDialog={setShowDialog}/>
    <div className="lobby">
		<PlayernameContext.Provider value={playerName}>
        <div className="playerlist"><PlayerList playerList={playerList} playerName={playerName} setShowDialog={setShowDialog}/></div>
        <div className="start-game"><Button>SPIEL STARTEN</Button></div>
		</PlayernameContext.Provider>
    </div>
	</>
}

export default Lobby;
