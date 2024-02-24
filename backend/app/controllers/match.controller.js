const db = require('../models/index');

const Match = db.match;

// Get a match
exports.findOne = async (req, res) => {
    const id = req.params.shortId;

    await Match.find({shortId: id}).exec((err, match) => {
        console.log(err);
        console.log(match);
    });
}