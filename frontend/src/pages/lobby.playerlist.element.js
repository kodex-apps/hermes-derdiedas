import React from 'react';

/* 
A playerlist element is composed of a name to the left side, a winPercentage number if there is one (don't have one at the stat),
an edit button in case you want to edit your name
*/
const PlayerListElement = props => {
    return <div>
        <div className="PLE__name">

        </div>
        <div className="PLE__score">

        </div>
        <div className="PLE__edit">

        </div>
        <div className="PLE__delete">
            
        </div>
    </div>
}

export default PlayerListElement;