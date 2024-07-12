const db = require("../models/index");
const Match = db.match;
const getNewId = require('../utils/match.getnewid');

// Function to return a Match. It will return a match object by its id
exports.findOne = (req, res) => {
	const id = req.params.matchId;

	Match.find({ _id: matchId })
		.then((data) => {
			if (!data) res.status(404).send({ message: `Couldn't find match ${id}` });
			else res.send(data);
		})
		.catch((err) => {
			res
				.status(500)
				.send({ message: err.message || "Unknown error finding the match." });
		});
};

// Function to create a new Lobby, it will return a new matchId. It will create a Match document with the given playerList and the created matchId
exports.create = (req, res) => {
	const matchOwner = req.params.ownerName;
	// Temp shortId for testing purposes. TODO: Create the actual generation of a short and unique id for each match, made of numbers
	// 1. If there isn't a matchId, check db for the oldest available Id and apply it to this match. This could be maybe done by getting a list of all matchIds, then starting with 001 it checks the array until one matchId is available and set that to the Match being created. To do this, sort the array of matchIds, and compare each element with its index, as soon as you find one where the index+1 isn't equivalent to the matchId (because we don't start with 0 in the matchIds) it means the number below the current matchId is free to take.
	// 2. Get 10 random words + articles and send them as a single array (let the client do the processing into an object, although maybe it'll be easier to maintain the model that already puts the article + word into a single object
	// 3. Put them into a Match object and respond with it
	
	// Temp wordList for testing purposes.
	const wordList = [
		[
			"Die",
			"Frau",
			"Der",
			"Mann",
			"Das",
			"Kind",
			"Das",
			"Auto",
			"Der",
			"Teufel",
			"Die",
			"Mutter",
			"Das",
			"Geschehen",
			"Die",
			"Granate",
			"Der",
			"Renner",
			"Die",
			"Klingel",
		],
	];
	await getNewId().then(newId => {
	// Create the Match object to be inserted to the DB
	const newMatch = new Match({
		_id: newId,
		owner: matchOwner,
		wordList: wordList,
		playerList: [matchOwner],
	});
	console.log(newMatch);
	// Save the Match object in the DB
	newMatch
		.save(newMatch)
		.then((data) => {
			console.log("New match created with ID " + newMatch._id);
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
