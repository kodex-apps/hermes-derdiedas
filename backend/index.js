const express = require("express");
const mongoose = require("mongoose");
const app = express();
const db = require("./app/models/");
const router = require("express").Router();
const cors = require('cors');
const https = require('node:https');
const fs = require('node:fs');

// Set up options for https
const options = {
	key: fs.readFileSync('/etc/letsencrypt/live/derdiedasspiel.de/privkey.pem'),
	cert: fs.readFileSync('/etc/letsencrypt/live/derdiedasspiel.de/fullchain.pem')
}
app.use(cors());
app.use(express.json());

// Connect to MongoDB, if succesful, start listening on port 3030.
db.mongoose
	.connect(db.url)
	.then(() => {
		console.log("Connected to MongoDB.");
		// Listen to 3030 with a secure connection
		https.createServer(options, (req, res) => {
			res.writeHead(200);
			res.end('Connection succesful');
		}).listen(3030);
		// Leaving this commented out in case I need it in the future
		//app.listen(3030, () => {
			//console.log("Listening on port 3030.");
		//});
	})
	.catch((err) => console.log(`MongoDB connection refused: ${err}.`));

// Add API routes
require("./app/routes/match.routes")(app, router);

// TODO: Commented out because I need to test how dates are shown in mongodb
// Clean up Matches that haven't been updated in the last 5m, every hour.
// For how long a match may be abandoned before it applies for removal in ms (60k ms in a minute, the second value are the minutes you want)
const MATCH_REMOVE_RATE = 60000 * 30;
setInterval(() => {
	currentDate = new Date();
	// Check if currentDate minutes is 00 (this will run every minute), if so, we can execute the cleanup function
	if (currentDate.getMinutes() == 00) {
		db.match.deleteMany({updatedAt: {$lte: new Date(currentDate.valueOf() - MATCH_REMOVE_RATE)}})
			.then((data) => console.log(`Deleted ${data.deletedCount} matches`));
	}
	
}, 60000);
