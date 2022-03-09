module.exports = {
    dialect: 'mysql',
    host: 'localhost',
    username: 'root',
    password: 'docker',
    database: 'isbnow',
    define: {
        timestamps: true,       //Usa os campos created_at e updated_at
        underscored: true,      //Nome no formato Snake Case. Ex: user_group
    },
};