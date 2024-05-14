module.exports = (mongoose) => {
	const Match = mongoose.model(
		"match",
		mongoose.Schema(
			{ shortID: Number, owner: String, wordList: Array, playerList: Array },
			{ timestamps: true },
		),
	);

	return Match;
};
