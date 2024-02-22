module.exports = mongoose => {
    const Game = mongoose.model(
        "game",
        {shortID: Number,
        wordList: Array,
        playerList: Array},
        {timestamps: true}
    );

    return Game;
}