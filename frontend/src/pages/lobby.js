import {React, useState} from 'react';
import './lobby.css';
import Button from '../components/button';
import PlayerList from '../components/lobby.playerlist';

// Placeholder variable for playerList
const playerList = [
    {
        placement: 3,
        name: "Lorenz",
        winPercentage: null,
        isOwner: false
    },
    {
        placement: 2,
        name: "Super super long name aaaa",
        winPercentage: "90%",
        isOwner: true
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
    // TODO: Create a function to get a playername that isn't taken (First Spieler_1, then Spieler_2, etc)
    const [playerName, setPlayerName] = useState();

    return (
    <div className="lobby">
        <div className="playerlist"><PlayerList playerList={playerList}/></div>
        <div className="start-game"><Button>SPIEL STARTEN</Button></div>
    </div>)
}

export default Lobby;