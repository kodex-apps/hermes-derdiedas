const db = require('../models/index');

const Match = db.match;

// Get a match
exports.findOne = (req, res) => {
    const id = req.params.shortId;

    Match.find({shortId: id})
        .then(data => {
            
        })
        .catch(err => {

        })

}