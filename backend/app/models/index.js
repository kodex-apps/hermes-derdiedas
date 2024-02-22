const dbConfig = require('../config/db.config');
const mongoose = require('mongoose');

const db = {
    mongoose: mongoose,
    url: dbConfig.url,
    game: require('./game.model.js')(mongoose),
    words: require('./words.model.js')(mongoose)
}

module.exports = db;