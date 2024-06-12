export default async function getMatch() {
	//TODO: Define the config file and import here as config
	const res = await fetch(config.url, {
		method: "GET",
		headers: {
			content-type: "application/json"
		}
	});

	return res.json();
}

