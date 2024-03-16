import React from 'react';

/* 
A playerlist element is composed of a name to the left side, a winPercentage number if there is one (don't have one at the stat),
an edit button in case you want to edit your name
*/
const PlayerListElement = props => {
    // TODO: Add an edit button and a delete button (if you're the owner, maybe pass as a prop your player name)
    return <tr>
    <div>
        <div className="PLE__name">
            {props.player.name}
        </div>
        <div className="PLE__score">
            {props.player.winPercentage}
        </div>
        <div className="PLE__edit">

        </div>
        <div className="PLE__delete">
            
        </div>
    </div>
    </tr>
}

export default PlayerListElement;