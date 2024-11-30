module.exports = (app, router) => {
	const matchController = require("../controllers/match.controller");

	// Get a match by its id
	router.get("/:matchId", matchController.findOne);

	// Create a match providing the first player's name (aka owner)
	router.post("/create", matchController.create);

	// Update a player's key depending on the commandName (check matchController explanation)
	router.put("/updatePlayer/:matchId", matchController.updatePlayer);

	// Add a new player to a match
	router.put("/addPlayer/:matchId", matchController.addPlayer);

	// COMMENTING OUT BECAUSE IT'S NO LONGER NEEDED. KEEPING JUST IN CASE.
	// router.put("/checkMatch/:matchId", matchController.checkMatch);

	// Set a match isOngoing to true and assign a wordList
	router.put("/startMatch/:matchId/:level", matchController.startMatch);

	router.put("/removePlayer", matchController.removePlayer);

	app.use("/", router);
};
