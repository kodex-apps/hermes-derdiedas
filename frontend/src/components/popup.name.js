import React from 'react';
import Button from './button';

const PopupName = props => {
    /* TODO: Create a popup that asks for a name, the popup's button is a callback function passed through props (use state?) to set the player's name.
    The player's name cannot be repeated (move this text to the callback description)
    20240408: Added basic dialog. Now create the listener in the edit button of the lobby to create a PopupName object and pass onto it a callback function to set the name (maybe make it get accept an argument with the name?)
	20240409: The dialog now shows. Now make the props.setUserName in line 15 actually yoink the name given in input and make that name change for the player who changed it.
    */
	
    return <dialog open={props.showDialog}>
        <form method="dialog">
            <label>Name:</label>
            <input type="text" onChange={e => props.setUserName(e.target.value ? e.target.value : props.originalName)} autofocus/>
            <Button onClick={() => {props.setShowDialog(false);}}>OK</Button>
        </form>
    </dialog>
}

export default PopupName;
