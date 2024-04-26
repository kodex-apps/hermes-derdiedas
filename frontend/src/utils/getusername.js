const getUsername = (playerList) => {
	let nameList = [];
	for (const player in playerList) {
		nameList.push(player.name);
	}
	let currentName = "Spieler";
	let index = 0;
	let gotUsername = false;
	while (!gotUsername) {
		if (nameList.includes(currentName)) {
			index++;
			currentName = "Spieler " + index;
		} else gotUsername = true;
	}

	return currentName;
};

export default getUsername;
