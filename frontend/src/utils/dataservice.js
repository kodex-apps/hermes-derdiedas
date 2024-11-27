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

	async addPlayer(matchId, playerObject) {
		const res = await fetch(config.fetchUrl + `/addPlayer/${matchId}`, {
			method: "PUT",
			headers: {
				"content-type": "application/json"
			},
			// http bodies are always strings
			body: JSON.stringify(playerObject)
		});

		return res;
	}

	async checkMatch(matchId) {
		const res = await fetch(config.fetchUrl + `/checkMatch/${matchId}`, {
			method: "PUT",
			headers: {
				"content-type": "application/json"
			}
		});

		return res;
	}


	async updatePlayer(matchId, playerName, commandName, commandArg) {
		const res = await fetch(config.fetchUrl + `/updatePlayer/${matchId}`, {
			method: "PUT",
			headers: {
				"content-type": "application/json"
			},
			// http bodies are always strings
			body: JSON.stringify({
				"matchId": matchId,
				"playerName": playerName,
				"commandName": commandName,
				"commandArg": commandArg
			})
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
	
	async removePlayer(matchId, playerId, playerName) {
		const res = await fetch(config.fetchUrl + `/removePlayer`, {
			method: "PUT",
			headers: {
				"content-type": "application/json"
			},
			body: JSON.stringify({
				"matchId" : matchId,
				"playerId" : playerId,
				"playerName" : playerName
			})
		});

		return res;
	}
}

export default new DataService();
