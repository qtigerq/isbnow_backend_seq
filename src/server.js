const express = require('express');
const cors = require('cors');                               //Para gerir conflitos de requisições
const routes = require('./routes');

require('./database')

const app = express();

app.use(express.json());
app.use(cors());                                            //Gerente de conflitos de requisições
app.use(routes);

app.listen(3001);