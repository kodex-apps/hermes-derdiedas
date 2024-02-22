const express = require('express');
const mongoose = require('mongoose');
const app = express();
const db = require('./app/models/');

app.get('/', (req, res) => {
    res.send('GET succesful!');
})

// Connect to MongoDB, if succesful, start listening on port 3030.
db.mongoose.connect(db.url)
.then(() => {
    console.log('Connected to MongoDB.');
    app.listen(3030, () => {console.log("Listening on port 3030.")});
    })
.catch((err) => console.log(`MongoDB connection refused: ${err}.`));