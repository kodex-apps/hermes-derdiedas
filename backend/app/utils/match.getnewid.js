const db = require('../models/index');

// getting a matchList for now, but it's worth checking whether we can extract just the Ids of every match for privacy reasons (TODO)
const getNewId = (matchList) => {
	// return the lowest Id possible for a new match to be created
	const MatchModel = db.model;
}

module.exports = getNewId;
