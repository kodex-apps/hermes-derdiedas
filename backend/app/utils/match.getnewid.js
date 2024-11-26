const db = require('../models/index');

// Returns an available ID
async function getNewId() {
	// Array that will hold all the currently used IDs
	let idArray = [];
	let idFound = false;
	const MatchModel = db.match;
	// Get a random number between 0 and 9999 to be the id of the match (it will then keep reducing it until it has found a match id that is available)
	let returnId = Math.floor(Math.random() * 9999);

	// Load into idArray all the _id keys of Matches
	await MatchModel.distinct('_id', {})
	.then(data => {
		idArray = data; 
		// Get highest id not in the array
		while (!idFound) {
			if (idArray.includes(returnId)) {returnId--;}
			else {idFound = true;}
			// On the case the are no more available IDs, increase the scope
			if (returnId === 0) returnId = 999999;
		}
		console.log("Creating match with id " + returnId);
	})  
	.catch(err => console.log(err.message || "Unknown error"));

	

	return returnId;
}

module.exports = getNewId;
