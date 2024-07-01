const db = require('../models/index');

// Returns an available ID
const getNewId = () => {
	// Array that will hold all the currently used IDs
	let idArray = [];
	let returnId = 9999;
	let idFound = false;
	const MatchModel = db.match;

	// Load into idArray all the _id keys of Matches
	MatchModel.distinct('_id', {})
	.then(data => idArray = data)  
	.catch(err => {console.log(err.message || "Unknown error");});
	
	// Get highest id not in the array
	while (!idFound) {
		if (idArray.includes(returnId)) returnId--;
		else idFound
		console.log("Creating match, trying with id: " + returnId);
		
		// On the case the are no more available IDs, increase the scope
		if (returnId === 0) returnId = 999999;
	}
	
	return returnId;
}

module.exports = getNewId;
