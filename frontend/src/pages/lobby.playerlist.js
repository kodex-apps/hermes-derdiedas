import React from 'react';
import PlayerListElement from './lobby.playerlist.element';
import './lobby.playerlist.css';

/* 
The playerlist shows PlayerListElements for each player and ordered according to the placement of each player.
*/
const PlayerList = props => {
    // Sort the playerList by placement
    props.playerList.sort((a, b) => {
        if (a.placement > b.placement) return 1;
        else if (a.placement < b.placement) return -1;
    })
    //TODO: Add conditional to the table header to show a % column if there is one
    return (
    <table className="playerlist__table">
        <tr>
            <th>Name</th>
        </tr>
        {props.playerList.map(player => <PlayerListElement player={player}/>)}
    </table>
    )
}

export default PlayerList;