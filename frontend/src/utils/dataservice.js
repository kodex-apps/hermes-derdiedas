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
			// GET is the default so we omit declaring it
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

	async startMatch(matchId) {
		const res = await fetch(config.fetchUrl + `/startMatch/${matchId}`, {
			method: "PUT",
			headers: {
				"content-type": "application/json"
			},
		});

		return res;
	}
	
	async removePlayer(matchId, playerName) {
		const res = await fetch(config.fetchUrl + `/removePlayer`, {
			method: "PUT",
			headers: {
				"content-type": "application/json"
			},
			body: JSON.stringify({
				"matchId" : matchId,
				"playerName" : playerName
			})
		});

		return res;
	}
}

export default new DataService();
