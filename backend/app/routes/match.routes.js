module.exports = (app, router) => {
	const matchController = require("../controllers/match.controller");

	// Get a match by its id
	router.get("/:matchId", matchController.findOne);

	// Create a match providing the first player's name (aka owner)
	router.post("/create", matchController.create);

	// Update a match providing the updated match (it'll know which one to updated through its id)
	router.put("/update/:matchId", matchController.update);

	app.use("/", router);
};
