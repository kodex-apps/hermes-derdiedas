const config = require("./config");

export default async function getMatch(playerName) {
	//TODO: Define the config file and import here as config
	console.log(config.fetchUrl);
	const res = await fetch(config.fetchUrl, {
		method: "POST",
		headers: {
			"content-type": "application/json",
		},
		mode: "no-cors",
		body: {
			"ownerName": `${playerName}`
		}
	});

	return res;
}

