const express = require('express');
const routes = express.Router();

const BookController = require('./controllers/BookController');

routes.param('id', function( req, res, next, id ) {
    req.id_from_param = id;
    next();
});

routes.get('/books/string', BookController.findByString);
routes.get('/books', BookController.index)
routes.get('/books/:book_id', BookController.findById);
routes.post('/books', BookController.store);
routes.delete('/books/:book_id', BookController.delete);

module.exports = routes;