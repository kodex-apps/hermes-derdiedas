const db = require("../models/index");
const Match = db.match;
const getNewId = require('../utils/match.getnewid');

// Function to return a Match. It will return a match object by its id
exports.findOne = (req, res) => {
	const matchId = req.params.matchId;

	Match.find({ _id: matchId })
		.then((data) => {match
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

	// TODO: If you're setting the last player to wordsComplete = 10, also set the match to isOngoing = false
}

exports.startMatch = (req, res) => {
	// Receive a matchId and set that match isOngoing variable to true and assign words to it
	const matchId = req.params.matchId;
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

	let match = await Match.find({ _id: matchId });
	match.wordList = loadedWords;
	match.isOngoig = true;
	match.save(match)
		.then(() => res.status(200).send())
		.catch((error) => res.status(500).send({ message: error.message }));
}
