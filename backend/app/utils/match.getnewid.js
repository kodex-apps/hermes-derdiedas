const db = require('../models/index');

// Returns an available ID
const getNewId = () => {
	// Array that will hold all the currently used IDs
	let idArray = [];

	const MatchModel = db.match;
	MatchModel.distinct('_id', {})
	.then(data => idArray = data)  
	.catch(err => {console.log(err.message || "Unknown error");});
}

module.exports = getNewId;
