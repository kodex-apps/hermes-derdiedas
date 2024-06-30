const config = require("./config");

export default async function getMatch(playerName) {
	//TODO: Define the config file and import here as config
	const res = await fetch(config.fetchUrl + `/create/${playerName}`, {
		method: "POST",
		headers: {
			"content-type": "application/json",
		},
		mode: "no-cors",
	});

	return res;
}

