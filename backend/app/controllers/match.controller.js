const db = require("../models/index");
const Match = db.match;
const getNewId = require('../utils/match.getnewid');
const getWordList = require('../utils/match.getwordlist');

// Function to return a Match. It will return a match object by its id
exports.findOne = (req, res) => {
	const matchId = req.params.matchId;

	Match.find({ _id: matchId })
		.then((data) => {
			if (!data || !data[0]) {
				res.status(404).send({ message: `Couldn't find match ${matchId}` });
			}
			else res.send(data[0]);
		})
		.catch((err) => {
			res
				.status(500)
				.send({ message: err.message || "Unknown error finding the match." });
		});
};

// Function to create a new Lobby, it will return a new matchId. It will create a Match document with the given playerList and the created matchId
exports.create = (req, res) => { 
	getNewId().then(newId => {
	// Create the Match object to be inserted to the DB
	const newMatch = new Match({
		_id: newId,
		playerList: [],
		isOngoing: false
	});
	console.log(newMatch);
	// Save the Match object in the DB
	newMatch
		.save(newMatch)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			console.log(err.message);
			res.status(500).send({
				message: err.message || "Unknown error creating the match.",
			});

		});
	});

	
	};

/*
 * This function will update a part of a player depending on the command that's send.
 * It will always receive these parameters: matchId, playerName (to make sure the correct player is modified in case page doesn't have fresh info)
 * The format of the explanation will be the commandName, then the argument/s received, and a short explanation.
 * 1, newName: change the name of the player
 * 2, count: set the wordsCompleted key
 * 3: finish that match for that player
 * 4, score: set the score
 */
exports.updatePlayer = (req, res) => {
	const matchId = req.params.matchId;
	const playerName = req.body.playerName;
	const commandName = req.body.commandName;
	// Description of the command for logging purposes
	let commandNameString;
	const commandArg = req.body.commandArg || '0';

	Match.find({ _id: matchId })
		.then(data => {
			let match = data[0];
			const player = match.playerList.find(e => e.name === playerName);
			switch (commandName) {
				case 1: player.name = commandArg; commandNameString = 'setName'; break;
				case 2: player.wordsCompleted = commandArg; commandNameString = 'setWordsCompleted'; break;
				case 3: player.hasPlayed = true; commandNameString = 'finishMatch'; break;
				case 4: player.score = commandArg; commandNameString = 'setScore'; break;
			}
			// If the player got to 10 wordsCompleted and everyone else did as well, finish the match.
			if ((player.wordsCompleted >= 10) && match.isOngoing && !match.playerList.some(e => e.wordsCompleted < 10)) match.isOngoing = false;
			match.playerList[match.playerList.findIndex(e => e.id === player.id)] = player;
			return match.save();})
		.then((data) => {
			console.log(`Match ${matchId} - Succesfully updated ${playerName}. Command ${commandNameString} with argument: ${commandArg}`);
			res.send(data);})
		.catch(error => {
			console.log(`Error updating player to match ${matchId}. ${error.name}: ${error.message}`);
			res.status(500).send(`Error updating player to match ${matchId}. ${error.name}: ${error.message}`);
		});
}

/*
 * This function will add a player to a match.
 * It will receive the following parameters:
 * matchId
 * playerObject: Full fledged object built in the front end which we will just add as a document.
 */
exports.addPlayer = (req, res) => {
	const matchId = req.params.matchId;
	let playerObject = req.body;
	
	Match.find({ _id: matchId })
		.then(data => {
			let match = data[0];

			// Check if a player with that name exists already
			if (match.playerList.some(e => e.name === playerObject.name)) throw new Error('Player name already taken');
			playerObject.id = match.playerList.length;
			match.playerList.push(playerObject);
			return match.save();})
		.then((data) => {
			console.log(`Succesfully added player ${playerObject.name} (ID: ${playerObject.id}) to match ${matchId}`);
			res.send(data);
		})
		.catch(error => {
			console.log(`Error adding player to match ${matchId}. ${error.name}: ${error.message}`);
			res.status(500).send(`Error adding player to match ${matchId}. ${error.name}: ${error.message}`);
		});
}

exports.startMatch = (req, res) => {
	// Receive a matchId and set that match isOngoing variable to true and assign words to it
	const matchId = req.params.matchId;
	// Temp wordList for testing purposes.
	const loadedWords = getWordList();

	Match.find({ _id: matchId })
		.then((match) => {
			let retrievedMatch = match[0];
			retrievedMatch.wordList = loadedWords;
			retrievedMatch.isOngoing = true;
			retrievedMatch.playerList.forEach(e => { 
				e.score = 0;
				e.wordsCompleted = 0;
				e.hasPlayed = false;
			});
			console.log('Starting following match: ');
			console.log(retrievedMatch);
			// Set the updateAt value to current date
			retrievedMatch.updatedAt = new Date();
			retrievedMatch.replaceOne(retrievedMatch)
				.then(() => res.status(200).send())
				.catch((error) => res.status(500).send({ message: error.message }));
		});
}

exports.removePlayer = (req, res) => {
	console.log("Recieved delete req");
	console.log(req.body);
	const playerId = Number(req.body.playerId);
	const matchId = req.body.matchId;
	const playerName = req.body.playerName;
	console.log(`Deleting ${playerName} (ID ${playerId}) from match ${matchId}`);

	Match.find({ _id: matchId }).
		then((data) => {
			const match = data[0];
			const playerToDelete = match.playerList.find(e => e.id === playerId);
			// If the playerToDelete fits with the playerName the user wants to delete, remove it from the playerList.
			if (playerToDelete.name === playerName) {
				match.playerList.splice(match.playerList.findIndex((e) => e.id === playerId), 1);
				match.replaceOne(match)
					.then(() => res.status(200).send())
					.catch(e => res.status(500).send( { message: error.message }));
			} else {
				res.status(500).send('Player and id mismatch, probably kicking too fast.');
			}
		});

}

/* 
 * Absolute fuck-up of a function because I can't be arsed to fix the architecture of the app.
 * When a client finds several matching player IDs (yeah fuck concurrency) it will send a signal for the backend to check it and fix it
 */
exports.checkMatch = (req, res) => {
	const matchId = req.params.matchId;
	let foundDuplicateId;
	let duplicateId;
	Match.find({ _id: matchId })
		.then((data) => {
			let match = data[0];
			let matchPlayerIds = [];

			match.playerList.forEach(e => {
				console.log(`Checking ${e.name} with ID ${e.id}`);
				if (matchPlayerIds.includes(e.id)) {
					foundDuplicateId = true;
					duplicateId = e.id;
				}
				matchPlayerIds.push(e.id);
			})
			if (foundDuplicateId) {
				console.log(`Found duplicate id ${duplicateId}`);
				match.playerList[match.playerList.findIndex(e => e.id === duplicateId)].id = match.playerList.length;
				return match.save();
			}
			else return data;
		})
		.then((data) => {
			console.log(`Succesfully checked match ${matchId}`);
			console.log(`DEBUG: checkMatch promise data:`);
			console.log(data);
			res.send(data);})
		.catch(error => {
			console.log(`Error checking match ${matchId}. ${error.name}: ${error.message}`);
			res.status(500).send(`Error checking match  ${matchId}. ${error.name}: ${error.message}`);});
}
