import React from 'react';
import './lobby.playerlist.element.css';
import editIcon from '../img/edit.png';
import deleteIcon from '../img/delete.png';

/* 
A playerlist element is composed of a name to the left side, a winPercentage number if there is one (don't have one at the stat),
an edit button in case you want to edit your name
*/
const PlayerListElement = props => {
    // TODO: Add an edit button and a delete button (if you're the owner, maybe pass as a prop your player name and check if isOwner)
    return <tr className="PLE">
        <td className="PLE__name">
            {props.player.name}
        </td>
        <td className="PLE__score">
            {props.player.winPercentage}
        </td>
        <td className="PLE__edit">
            <img className="PLE__img--edit" src={editIcon} />
        </td>
        <td className="PLE__delete">
            <img className="PLE__img--delete" src={deleteIcon} />
        </td>
    </tr>
}

export default PlayerListElement;