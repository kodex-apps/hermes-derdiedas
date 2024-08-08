const db = require("../models/index");
const Match = db.match;
const getNewId = require('../utils/match.getnewid');

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
	// Temp shortId for testing purposes. TODO: Create the actual generation of a short and unique id for each match, made of numbers 1. If there isn't a matchId, check db for the oldest available Id and apply it to this match. This could be maybe done by getting a list of all matchIds, then starting with 001 it checks the array until one matchId is available and set that to the Match being created. To do this, sort the array of matchIds, and compare each element with its index, as soon as you find one where the index+1 isn't equivalent to the matchId (because we don't start with 0 in the matchIds) it means the number below the current matchId is free to take. 2. Get 10 random words + articles and send them as a single array (let the client do the processing into an object, although maybe it'll be easier to maintain the model that already puts the article + word into a single object 3. Put them into a Match object and respond with it
	
	// Temp wordList for testing purposes.
	const loadedWords = [
		{ article: "die", word: "Limousine", isCurrentWord: true, isCorrectWord: null },
		{ article: "die", word: "Frau", isCurrentWord: false, isCorrectWord: null },
		{ article: "der", word: "Mann", isCurrentWord: false, isCorrectWord: null },
		{ article: "das", word: "Interesse", isCurrentWord: false, isCorrectWord: null },
		{ article: "der", word: "Meister", isCurrentWord: false, isCorrectWord: null },
		{ article: "die", word: "Bremse", isCurrentWord: false, isCorrectWord: null },
		{ article: "der", word: "Junge", isCurrentWord: false, isCorrectWord: null },
		{ article: "das", word: "Kind", isCurrentWord: false, isCorrectWord: null },
		{ article: "die", word: "Mermelade", isCurrentWord: false, isCorrectWord: null },
		{ article: "die", word: "Mitfahrgelegenheit", isCurrentWord: false, isCorrectWord: null }
	];

	getNewId().then(newId => {
	// Create the Match object to be inserted to the DB
	const newMatch = new Match({
		_id: newId,
		wordList: loadedWords,
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
	// Get the Match object that comes with the request and initialise a Match object with it
	const match = new Match(req.body);
	console.log(`About to update: ${match}`);

	// TODO: When receiving a player object, if it already exists, compare its values with the one in the db and update the new ones. If it's a new one, just add it to the match. 
	match
		.replaceOne(match)
		.then((data) => {
			console.log("Updating match:" + data);
			res.send(data);
		})
		.catch(err => {
			console.log(err.message);
			res.status(500).send({
				message: err.message || "Unknown error updating the match."
			});
		});
}
