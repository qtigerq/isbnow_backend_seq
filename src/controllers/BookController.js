const { Op } = require('sequelize');            //Operators do sequelize (https://sequelize.org/v6/manual/model-querying-basics.html#operators)
const Book = require('../models/Book');

module.exports = {

    //Buscar todos
    async index(req, res){
        const books = await Book.findAll();

        return res.json(books);
    },

    //Buscar um pelo ID
    async findById(req, res){
        const { book_id } = req.params;
        const book = await Book.findByPk(book_id);

        if (!book){
            return res.status(400).json({ error: 'Book not found' });
        }

        return res.json(book);
    },

    //Buscar um por uma String
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

    //Cadastrar
    async store(req, res){
        const { isbn, title, authors, category, publisher, language, pages, publi_year } = req.body;
        
        const book = await Book.create({ isbn, title, authors, category, publisher, language, pages, publi_year });
        
        return res.json(book);
    },

    //Excluir
    async delete(req, res) {
        //Recebe os parametros do livro
        const { book_id } = req.params;

        //Verifica se o livro com ID book_id existe
        const book = await Book.findByPk(book_id);
        if (!book) {
            return res.status(400).json({ error: 'Book not found' });
        }

        //Remove o livro com o método autogerado pelo Sequelize.
        await Book.destroy({
            where: {
                id: [book_id]
            }
        });

        return res.json();
    },    
};