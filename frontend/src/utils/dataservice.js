const config = require("./config");

class DataService {
	// Returns a new Match object
	async post() {
		const res = await fetch(config.fetchUrl + `/create`, {
			method: "POST",
			headers: {
				"content-type": "application/json",
			}
		});

		return res;
	}

	// Gets Match object
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

	async updatePlayer(matchId, playerId, commandName, commandArg) {
		const res = await fetch(config.fetchUrl + `/updatePlayer/${matchId}`, {
			method: "PUT",
			headers: {
				"content-type": "application/json"
			},
			// http bodies are always strings
			body: JSON.stringify({
				"matchId": matchId,
				"playerId": playerId,
				"commandName": commandName,
				"commandArg": commandArg
			})
		});
		
		return res;
	}

	async updateMatch(matchId, commandValue, commandArg) {
		const res = await fetch(config.fetchUrl + `/updateMatch/${matchId}`, {
			method: "PUT",
			headers: {
				"content-type": "application/json"
			},
			// http bodies are always strings
			body: JSON.stringify({
				"matchId": matchId,
				"commandValue": commandValue,
				"commandArg": commandArg
			})
		});
		
		return res;
	}
	
	async startMatch(matchId, level) {
		const res = await fetch(config.fetchUrl + `/startMatch/${matchId}/${level}`, {
			method: "PUT",
			headers: {
				"content-type": "application/json"
			},
		});

		return res;
	}
	
	async removePlayer(matchId, playerId) {
		const res = await fetch(config.fetchUrl + `/removePlayer`, {
			method: "PUT",
			headers: {
				"content-type": "application/json"
			},
			body: JSON.stringify({
				"matchId" : matchId,
				"playerId" : playerId
			})
		});

		return res;
	}
}

export default new DataService();
