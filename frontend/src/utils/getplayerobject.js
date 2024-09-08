const getPlayerObject = (match, playerName) => {
	return match.playerList[match.playerList.findIndex(e => e.name === playerName)];
}

export default getPlayerObject;
