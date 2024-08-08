const config = require("./config");

class DataService {
	async post() {
		const res = await fetch(config.fetchUrl + `/create`, {
			method: "POST",
			headers: {
				"content-type": "application/json",
			}
		});

		return res;
	}

	async get(id) {
		const res = await fetch(config.fetchUrl + `/${id}`, {
			headers: {
				"content-type": "application/json"
			}
		});

		return res;
	}

	async update(object, matchId) {
		//console.log("Sending body: " + JSON.stringify(match));
		const res = await fetch(config.fetchUrl + `/update/${matchId}`, {
			method: "PUT",
			headers: {
				"content-type": "application/json"
			},
			// http bodies are always strings
			body: JSON.stringify(object)
		});

		return res;
	}

	startMatch(matchId) {
		const res = await fetch(config.fetchUrl + `/startMatch/${matchId}`, {
			method: "PUT",
			headers: {
				"content-type": "application/json"
			},
		});

		return res;
	}
}

export default new DataService();
