module.exports = mongoose => {
    const Match = mongoose.model(
        "match",
        mongoose.Schema({shortID: Number,
        wordList: Array,
        playerList: Array},
        {timestamps: true})
    );

    return Match;
}