const crypto = require('crypto');
const axios = require('axios');
const bookController = require('../controllers/BookController');

const getRandomString = (chars) => {
    return crypto.randomBytes(chars).toString('hex');
};

const getRandomIsbn = () => {
    min = 1000000000000;
    max = 9999999999999;
    return Math.floor(Math.random() * (max - min)) + min;
}

const request = (url, method, data) => {
    return axios({url, method, data, validadeStatus: false})
};

const createRandomBook = () => {
    const book = {
        isbn: getRandomIsbn(), 
        title: getRandomString(20), 
        authors: getRandomString(20)
    }
    return bookController.store(book);
};

test.only('Should get books', async function(){
    const book1 = await createRandomBook();
    const book2 = await createRandomBook();
    const book3 = await createRandomBook();
    const response = await request('http://localhost:3001/books', 'get');

    expect(response.data).toHaveLength(5);

    await booksService.deleteBook(book1.id);
    await booksService.deleteBook(book2.id);
    await booksService.deleteBook(book3.id);
});

test('Should get a book by string', async function(){
    const book = await createRandomBook();
    const response = await request(`http://localhost:3001/books/${book.title}`, 'get', );
    const foundBook = response.data;

    expect(foundBook[0].title).toBe(book.title);

    await booksService.deleteBook(book.id);
});

test('Should save a book', async function(){ 
    const responseBefore = await booksService.getBooks();
    expect(responseBefore).toHaveLength(0);
    const data = {isbn: getRandomIsbn(), title: getRandomString(20), authors: getRandomString(20)};
    const responseSaveABook = await request('http://localhost:3001/books', 'post', data);
    const book = responseSaveABook.data;
    const responseAfter = await booksService.getBooks();

    expect(responseAfter).toHaveLength(1);
    expect(data.title).toBe(book.title);
    expect(data.authors).toBe(book.authors);

    await booksService.deleteBook(book.id);
});

test('Should update a book', async function(){
    const book = await createRandomBook();
    const newBookInfo = {title: 'new title', authors: 'new authors'};
    const response = await request(`http://localhost:3001/books/${book.id}`, 'put', newBookInfo);
    const updatedBook = response.data;

    expect(newBookInfo.title).toBe(updatedBook.title);
    expect(newBookInfo.authors).toBe(updatedBook.authors);

    await booksService.deleteBook(book.id);
});

test('Should delete a book', async function(){
    const book = await createRandomBook();
    const response = await request(`http://localhost:3001/books/${book.id}`, 'delete', );
    const books = await booksService.getBooks();
    
    expect(books).toHaveLength(0);
});