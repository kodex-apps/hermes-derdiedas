const db = require("../models/index");
const Match = db.match;
const getNewId = require('../utils/match.getnewid');
const getWordList = require('../utils/match.getwordlist');

// Function to return a Match. It will return a match object by its id
exports.findOne = (req, res) => {
	const matchId = req.params.matchId;

	Match.find({ _id: matchId })
		.then((data) => {
			if (!data) res.status(404).send({ message: `Couldn't find match ${id}` });
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


exports.update = (req, res) => {
	const player = req.body;
	console.log("Updating match with following object:");
	console.log(player);
	Match.find({ _id: req.params.matchId })
		.then((latestMatchArray) => {
			// The result comes in an array so we get the object
			latestMatch = latestMatchArray[0];
			console.log("Found match to update with id: " + req.params.matchId);
			console.log(latestMatch);
			const indexOfPlayer = latestMatch.playerList.findIndex(e => (e.name === player.name) || (e.id === player.id));
			console.log(`The index of ${player.name} is ${indexOfPlayer}`);
;
			// We assume we will only receive player objects here.
			// If the player already exists, substitute it with the new player object. If it's new, assign it an id and add it to the playerList.
			if (indexOfPlayer != -1) {
				latestMatch.playerList[indexOfPlayer] = player;
				latestMatch.playerList[indexOfPlayer].id = indexOfPlayer;
				// Check if all players have wordsCompleted = 10 and the match is still onGoing to finish it
				if ((latestMatch.playerList.findIndex(e => e.wordsCompleted != 10) === -1) && latestMatch.isOngoing) {
					latestMatch.isOngoing = false;
					console.log(`Finishing match: ${latestMatch._id}`);
				}
				console.log("Player was found in match, substituting.");
			}
			else {
				console.log("Player not found, assigning id: " + latestMatch.playerList.length);
				// Add the player id (last id + 1)
				player.id = latestMatch.playerList.length;
				latestMatch.playerList.push(player);
			}
			latestMatch
				.replaceOne(latestMatch)
				.then((data) => {
					console.log("Updating match:");
					console.log(latestMatch);
					res.send(latestMatch);
				})
				.catch(err => {
					console.log(err.message);
					res.status(500).send({
						message: err.message || "Unknown error updating the match."
					});
				});
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
			retrievedMatch.replaceOne(retrievedMatch)
				.then(() => res.status(200).send())
				.catch((error) => res.status(500).send({ message: error.message }));
		});
}

exports.removePlayer = (req, res) => {
	console.log("Recieved delete req");
	console.log(req.body);
	const playerName = req.body.playerName;
	const matchId = req.body.matchId;
	console.log(`About to remove player id ${playerName} of match ${matchId}`);

	Match.find({ _id: matchId }).
		then((data) => {
			let retrievedMatch = data[0];
			retrievedMatch.playerList.splice(
				retrievedMatch.playerList.findIndex((e) => e.id === playerName),
				1);
			retrievedMatch.replaceOne(retrievedMatch)
				.then(() => res.status(200).send())
				.catch(e => res.status(500).send( { message: error.message }));
		});
}

	
