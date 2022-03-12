const { Model, DataTypes } = require('sequelize');

class Book extends Model {
    static init(connection) {
        super.init({
            isbn: DataTypes.INTEGER,
            title: DataTypes.STRING,
            authors: DataTypes.STRING,
            category: DataTypes.STRING,
            publisher: DataTypes.STRING,
            language: DataTypes.STRING,
            pages: DataTypes.INTEGER,
            publi_year: DataTypes.INTEGER,
        }, {
            sequelize: connection
        })
    }
}

module.exports = Book;