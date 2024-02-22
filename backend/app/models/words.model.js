module.exports = mongoose => {
    const Words = mongoose.model(
        "words",
        {article: String,
        word: String},
        {timestamps: true}
    );

    return Words;
}