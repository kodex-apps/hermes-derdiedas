const db = require('../models/index');

const Match = db.match;

// Get a match
exports.findOne = (req, res) => {
    const id = req.params.shortId;

    Match.find({shortId: id})
        .then(data => {
           if (!data) res.status(404).send({message: `Couldn't find match ${id}`});
           else res.send(data);
        })
        .catch(err => {
            res.status(500).send({message: `${err}`})
        });
}

exports.create = (req, res) => {
    const matchOwner = req.params.ownerName;
    // Temp shortId for testing purposes. TODO: Create the actual generation of a short and unique id for each match, made of numbers?
    const minCeilied = Math.ceil(1);
    const maxFloored = Math.floor(1000);
    const randomShortId = Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
    // Temp wordList for testing purposes.
    const wordList = [["Die", "Frau", "Der", "Mann", "Das", "Kind", "Das", "Auto", "Der", "Teufel", "Die", "Mutter", "Das", "Geschehen", "Die", "Granate", "Der", "Renner", "Die", "Klingel"]];

    const newMatch = new Match({
        shortId: randomShortId,
        owner: matchOwner,
        wordList: wordList,
        playerList: [matchOwner]
    })
}