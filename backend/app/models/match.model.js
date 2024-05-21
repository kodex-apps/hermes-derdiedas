module.exports = (mongoose) => {
	const Match = mongoose.model(
		"match",
		mongoose.Schema(
			// Overwriting _id so we can set our own 4 digit IDs
			{ _id: Number, wordList: Array, playerList: Array },
			{ timestamps: true },
		),
	);

	return Match;
};
