const crypto = require('crypto');                                                               //para gerar strigs randomicas de forma a gerar cenários iniciais e deixar os testes menos viciados
const axios = require('axios');                                                                 //biblioteca HTTP para fazer requisições - https://axios-http.com/docs/intro
const bookController = require('../controllers/BookController');                                //Obtem a camada de controle

const getRandomString = (chars) => {
    return crypto.randomBytes(chars).toString('hex');                                           //Função para gerar uma string aleatoria
};

const getRandomIsbn = () => {                                                                   //Função para gerar um ISBN aleatorio
    min = 1000000000000;
    max = 9999999999999;
    return Math.floor(Math.random() * (max - min)) + min;
  }

const request = (url, method, data) => {                                                        //Função para enviar a requisição usando o Axios
    return axios({url, method, data, validadeStatus: false})                                        //validadestatus:false - não valide o status automaticamente (controle vai ser do programador), caso contrário ele abortaria o fluxo de execução caso o status fosse diferente de 200.
};

const createRandomBook = () => {                                                                //Função para gerar um livro aleatório
    const book = {
        isbn: getRandomIsbn(), 
        title: getRandomString(20), 
        authors: getRandomString(20)
    }
    return bookController.store(book);
};

//TESTES UNITÁRIOS
test.only('Should get books', async function(){                                                      //GET

    const book1 = await createRandomBook();
    const book2 = await createRandomBook();
    const book3 = await createRandomBook();

    const response = await request('http://localhost:3001/books', 'get');                           //Faz uma busca pelos livros na tabela
    expect(response.data).toHaveLength(5);                                                          //Verificar se existem 3 livros

    await booksService.deleteBook(book1.id);                                                        //Exclui os livros gerados aleatoriamente para o teste
    await booksService.deleteBook(book2.id);
    await booksService.deleteBook(book3.id);
});

test('Should get a book by string', async function(){                                      //GET BY STRING

    const book = await createRandomBook();                                                          //Cria um livro aleatorio no banco de dados
    
    const response = await request(`http://localhost:3001/books/${book.title}`, 'get', );           //Manda a requisição para buscar o livro pelo titulo

    const foundBook = response.data;

    expect(foundBook[0].title).toBe(book.title);

    await booksService.deleteBook(book.id);

});

test('Should save a book', async function(){                                                    //POST

    const responseBefore = await booksService.getBooks();
    expect(responseBefore).toHaveLength(0);                                                         //Verificar se a tabela sem registros salvos

    const data = {isbn: getRandomIsbn(), title: getRandomString(20), authors: getRandomString(20)};
    const responseSaveABook = await request('http://localhost:3001/books', 'post', data);
    const book = responseSaveABook.data;

    const responseAfter = await booksService.getBooks();
    expect(responseAfter).toHaveLength(1);                                                          //Verifica se foi salvo um registro

    expect(data.title).toBe(book.title);                                                            //Verifica se o título salvo no banco bate com o titulo gerado no teste
    expect(data.authors).toBe(book.authors);                                                        //O mesmo para o autor

    await booksService.deleteBook(book.id);                                                         //Exclui o livro gerado aleatoriamente para o teste

});

test('Should update a book', async function(){                                                  //UPDATE

    const book = await createRandomBook();                                                          //Cria um livro aleatorio no banco de dados
    const newBookInfo = {title: 'new title', authors: 'new authors'};                               //Cria atualizações para serem feitas num livro
    
    const response = await request(`http://localhost:3001/books/${book.id}`, 'put', newBookInfo);   //Manda a requisição para alterar o livro
    const updatedBook = response.data;                                                              //UpdatedBook recebe o livro alterado do banco

    expect(newBookInfo.title).toBe(updatedBook.title);
    expect(newBookInfo.authors).toBe(updatedBook.authors);

    await booksService.deleteBook(book.id);                                                         //Exclui o livro gerado aleatoriamente para o teste

});

test('Should delete a book', async function(){                                                  //DELETE

    const book = await createRandomBook();                                                          //Cria um livro aleatorio no banco de dados
    
    const response = await request(`http://localhost:3001/books/${book.id}`, 'delete', );           //Manda a requisição para excluir o livro

    const books = await booksService.getBooks();                                                    //Busca todos os livros do banco
    expect(books).toHaveLength(0);                                                                  //Verificar se o banco não possui nenhum livro cadastrado

});