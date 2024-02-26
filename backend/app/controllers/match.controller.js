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