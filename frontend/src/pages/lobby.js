import React from 'react';
import './lobby.css';
import Button from '../components/button';

const playerList = [
    {
        placement: 1,
        name: "User1",
        winPercentage: null
    },
    {
        placement: 2,
        name: "User 2933",
        winPercentage: "60%"
    }
]

/* 
The match Lobby should be where you see the player list and can click PARTIE STARTEN or SPIEL STARTEN (TBD) 
*/
const Lobby = (props) => {
    return (
    <div className="lobby">
        <div className="playerlist"></div>
        <div className="start-game"><Button>SPIEL STARTEN</Button></div>
    </div>)
}

export default Lobby;