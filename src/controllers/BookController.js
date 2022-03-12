const { Op } = require('sequelize');
const Book = require('../models/Book');

module.exports = {
    async index(req, res){
        const books = await Book.findAll();
        return res.json(books);
    },

    async findById(req, res){
        const { book_id } = req.params;
        const book = await Book.findByPk(book_id);

        if (!book){
            return res.status(400).json({ error: 'Book not found' });
        }

        return res.json(book);
    },

    async findByString(req, res){
        const { string } = req.params;
        const books = await Book.findAll({
            where: {
                title: {
                    [Op.like]: `%${[string]}%`
                }
            }
        });

        if (!books){
            return res.status(400).json({ error: 'No books found' });
        }

        return res.json(books);
    },    

    async store(req, res){
        const { isbn, title, authors, category, publisher, language, pages, publi_year } = req.body;
        const book = await Book.create({ isbn, title, authors, category, publisher, language, pages, publi_year });
        
        return res.json(book);
    },

    async delete(req, res) {
        const { book_id } = req.params;
        const book = await Book.findByPk(book_id);

        if (!book) {
            return res.status(400).json({ error: 'Book not found' });
        }

        await Book.destroy({
            where: {
                id: [book_id]
            }
        });

        return res.json();
    },    
};