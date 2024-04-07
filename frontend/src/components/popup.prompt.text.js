import React from 'react';
import Button from './button';

const PopupText = props => {
    /* TODO: Create a popup that asks for a name, the popup's button is a callback function passed through props (use state?) to set the player's name.
    The player's name cannot be repeated (move this text to the callback description)
    */
	return <dialog>
        <form method="dialog">
            <label>Neuer Name:</label>
            <input type="text"/>
            <Button>OK</Button>
        </form>
    </dialog>
}

export default PopupText;
