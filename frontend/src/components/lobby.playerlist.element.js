import React from 'react';
import './lobby.playerlist.element.css';
import editIcon from '../img/edit.png';
import deleteIcon from '../img/delete.png';
import PopupName from './popup.name';
/* 
A playerlist element is composed of a name to the left side, a winPercentage number if there is one (don't have one at the stat),
an edit button in case you want to edit your name
*/
const PlayerListElement = props => {

	// Callback function to set the player's username via popup
	const setUsernameCallback = (setUsername) => {
		<PopupName showDialog={true} callback={setUsername}/>;
	}
    // TODO: Add an edit button and a delete button (if you're the owner, maybe pass as a prop your player name and check if isOwner)
	return <tr className="PLE">
        <td className="PLE__name">
            {props.player.name}
        </td>
        <td className="PLE__score">
            {props.player.winPercentage}
        </td>
        <td className="PLE__edit">
            <img alt="Edit Button" className="PLE__img--edit" src={editIcon} onClick={setUsernameCallback(props.setUsername)} />
        </td>
        <td className="PLE__delete">
            <img alt="Delete Button" className="PLE__img--delete" src={deleteIcon} />
        </td>
    </tr>
}

export default PlayerListElement;
