const express = require("express");
const mongoose = require("mongoose");
const app = express();
const db = require("./app/models/");
const router = require("express").Router();
const cors = require('cors');
const https = require('node:https');
const fs = require('node:fs');

let options = {};
// Check if we're in developement mode or not (so we don't have to bother with SSL certificate)
if (process.env.NODE_ENV != 'dev' || !process.env.NODE_ENV) {
	// Set up options for https
	options = {
		key: fs.readFileSync('/etc/letsencrypt/live/derdiedasspiel.de/privkey.pem'),
		cert: fs.readFileSync('/etc/letsencrypt/live/derdiedasspiel.de/fullchain.pem'),
		uniqueHeaders: ['Access-Control-Allow-Origin', 'https://derdiedasspiel.de']
	}
}

app.use(cors());
app.use(express.json());

// Add API routes
require("./app/routes/match.routes")(app, router);

// Connect to MongoDB, if succesful, start listening on port 3030.
db.mongoose
	.connect(db.url)
	.then(() => {
		console.log("Connected to MongoDB.");
		// Listen to 3030 with a secure connection
		if (process.env.NODE_ENV != 'dev') {
			https.createServer(options, app).listen(3030);
			console.log("Listening on port 3030 in prod mode.");
		} else {
			app.listen(3030, () => {
			console.log("Listening on port 3030 in dev mode.");
		});
		}
	})
	.catch((err) => console.log(`MongoDB connection refused: ${err}.`));

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
