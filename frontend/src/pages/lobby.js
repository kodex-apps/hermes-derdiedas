import React from 'react';
import './lobby.css';
import Button from '../components/button';
import PlayerList from './lobby.playerlist';

const playerList = [
    {
        placement: 1,
        name: "User1",
        winPercentage: null,
        isOwner: false
    },
    {
        placement: 2,
        name: "User 2933",
        winPercentage: "60%",
        isOwner: true
    }
]

/* 
The match Lobby should be where you see the player list and can click PARTIE STARTEN or SPIEL STARTEN (TBD) 
*/
const Lobby = (props) => {
    return (
    <div className="lobby">
        <div className="playerlist"><PlayerList playerList={playerList}/></div>
        <div className="start-game"><Button>SPIEL STARTEN</Button></div>
    </div>)
}

export default Lobby;