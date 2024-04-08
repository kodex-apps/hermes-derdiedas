import React from 'react';
import Button from './button';

const PopupName = props => {
    /* TODO: Create a popup that asks for a name, the popup's button is a callback function passed through props (use state?) to set the player's name.
    The player's name cannot be repeated (move this text to the callback description)
    20240408: Added basic dialog. Now create the listener in the edit button of the lobby to create a PopupName object and pass onto it a callback function to set the name (maybe make it get accept an argument with the name?)
    */
    
    const [showDialog, setShowDialog] = React.useState(props.showDialog);
    const openDialog = () => setShowDialog(true);
    const closeDialog = () => setShowDialog(false);

	return <dialog open={showDialog}>
        <form method="dialog">
            <label>Name:</label>
            <input type="text" autofocus/>
            <Button onClick={() => {closeDialog(); props.callback();}}>OK</Button>
        </form>
    </dialog>
}

export default PopupName;
