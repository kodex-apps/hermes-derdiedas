const dbConfig = require('../config/db.config');
const mongoose = require('mongoose');

// Hold all the information of the DB to create a connection, get the models, etc.
const db = {
    mongoose: mongoose,
    url: dbConfig.url,
    match: require('./match.model.js')(mongoose),
    word: require('./word.model.js')(mongoose)
}

module.exports = db;