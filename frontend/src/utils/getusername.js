const getUsername = (playerList) => {
	let nameList = [];
	// Populate the local variable with the playerNames in playerList
	for (const player of playerList) {
		nameList.push(player.name);
	}
	let currentName = "Spieler";
	let index = 0;
	let gotUsername = false;
	while (!gotUsername) {
		// If the name we assigned already exists, add the same one with a number after it until we got it
		if (nameList.includes(currentName)) {
			index++;
			currentName = "Spieler " + index;
		} else gotUsername = true;
	}

	return currentName;
};

export default getUsername;
