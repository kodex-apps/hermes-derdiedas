const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.get('/', (req, res) => {
    res.send('GET succesful!');
})

mongoose.connect('mongodb://192.168.1.46:27017/')
    .then(() => console.log('Connected to MongoDB.'))
    .catch((reason) => console.log(`MongoDB connection refused: ${reason}.`));

app.listen(3030, () => {console.log("Listening on port 3030.")});