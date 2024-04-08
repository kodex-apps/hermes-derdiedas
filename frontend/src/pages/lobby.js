import {React, useState} from 'react';
import './lobby.css';
import Button from '../components/button';
import PlayerList from '../components/lobby.playerlist';
import getUsername from '../utils/getusername';

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

    return (
    <div className="lobby">
        <div className="playerlist"><PlayerList playerList={playerList} playerName={playerName} setUserName={setUserName}/></div>
        <div className="start-game"><Button>SPIEL STARTEN</Button></div>
    </div>)
}

export default Lobby;
