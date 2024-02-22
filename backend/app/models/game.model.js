module.exports = mongoose => {
    const Game = mongoose.model(
        "game",
        mongoose.Schema({shortID: Number,
        wordList: Array,
        playerList: Array},
        {timestamps: true})
    );

    return Game;
}