module.exports = (mongoose) => {
	const Word = mongoose.model(
		"word",
		mongoose.Schema({ article: String, word: String }, { timestamps: true }),
	);

	return Word;
};
