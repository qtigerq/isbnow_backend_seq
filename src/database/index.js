const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Book = require('../models/Book');

const connection = new Sequelize(dbConfig);

Book.init(connection);

module.exports = connection;