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

	// Function to show the PopupName dialog, state variable function is passed in the props 
	const showDialog = () => {
		props.setShowDialog(true);
	}

    // TODO: Add an edit button and a delete button (if you're the owner, maybe pass as a prop your player name and check if isOwner)
	return <tr className="PLE">
        <td className="PLE__name">
            {props.playerElement.name}{props.userName == props.playerElement.name ? (<div className="PLE__edit">&nbsp;
            <img alt="Edit Button" className="PLE__img--edit" src={editIcon} onClick={showDialog} />
        </div>) : null}

        </td>
        <td className="PLE__score">
            {props.playerElement.winPercentage}
        </td>
	{props.playerList.some((e) => (e.name === props.userName) && (e.isOwner)) ? (<td className="PLE__delete">
            <img alt="Delete Button" className="PLE__img--delete" src={deleteIcon} />
        </td>) : null}
    </tr>
}

export default PlayerListElement;
