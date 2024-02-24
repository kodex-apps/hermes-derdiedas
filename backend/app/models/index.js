const dbConfig = require('../config/db.config');
const mongoose = require('mongoose');

const db = {
    mongoose: mongoose,
    url: dbConfig.url,
    match: require('./match.model.js')(mongoose),
    word: require('./words.model.js')(mongoose)
}

module.exports = db;