module.exports = mongoose => {
    const Words = mongoose.model(
        "words",
        mongoose.Schema({article: String,
        word: String},
        {timestamps: true})
    );

    return Words;
}