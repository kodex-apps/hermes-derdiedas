const config = require("./config");

export default async function getMatch() {
	//TODO: Define the config file and import here as config
	console.log(config.fetchUrl);
	const res = await fetch(config.fetchUrl, {
		method: "GET",
		headers: {
			"content-type": "application/json"
		}
	});

	return res;
}

