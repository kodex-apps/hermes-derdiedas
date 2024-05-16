const db = require("../models/index");
const Match = db.match;

// Function to return a Match. It will return a match object by its id
exports.findOne = (req, res) => {
	const id = req.params.shortId;

	Match.find({ shortID: id })
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
	// 1. If there isn't a matchId, check db for the oldest available Id and apply it to this match.
	// 2. Get 10 random words + articles and send them as a single array (let the client do the processing into an object, although maybe it'll be easier to maintain the model that already puts the article + word into a single object
	// 3. Put them into a Match object and respond with it
	const minCeiled = Math.ceil(1);
	const maxFloored = Math.floor(1000);
	const randomShortId = Math.floor(
		Math.random() * (maxFloored - minCeiled) + minCeiled,
	);
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

	const newMatch = new Match({
		shortID: randomShortId,
		owner: matchOwner,
		wordList: wordList,
		playerList: [matchOwner],
	});

	newMatch
		.save(newMatch)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Unknown error creating the match.",
			});
		});
};
