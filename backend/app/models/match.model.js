module.exports = (mongoose) => {
	const Match = mongoose.model(
		"match",
		mongoose.Schema(
			// Overwriting _id so we can set our own 4 digit IDs
			{ _id: Number, wordList: Array, playerList: [{name: String, wordsCompleted: Number, score: Number, isOwner: Boolean, hasPlayed: Boolean}], isOngoing: Boolean, level: String},
			{ timestamps: true },
		),
	);

	return Match;
};
