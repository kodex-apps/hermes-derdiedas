const config = require("./config");

export default async function getMatch(playerName) {
	const res = await fetch(config.fetchUrl + `/create/${playerName}`, {
		method: "POST",
		headers: {
			"content-type": "application/json",
		}
	});

	return res;
}

