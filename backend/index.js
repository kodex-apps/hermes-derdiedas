const express = require("express");
const mongoose = require("mongoose");
const app = express();
const db = require("./app/models/");
const router = require("express").Router();

app.use(express.json());

// Connect to MongoDB, if succesful, start listening on port 3030.
db.mongoose
	.connect(db.url)
	.then(() => {
		console.log("Connected to MongoDB.");
		app.listen(3030, () => {
			console.log("Listening on port 3030.");
		});
	})
	.catch((err) => console.log(`MongoDB connection refused: ${err}.`));

// Add API routes
require("./app/routes/match.routes")(app, router);
