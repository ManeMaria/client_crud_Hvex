const express = require('express');
// eslint-disable-next-line import/no-unresolved
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
// const path = require('path');
require('dotenv').config();

const app = express();

// --> importar o arquivo database.js
const localdatabase = require('./config/database');

// --> conexão com a base de dados
mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);
mongoose.connect(localdatabase.local.localURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}, { useNewUrlParser: true }).then(() => {
  console.log('a base foi conectada com sucesso');
},
(err) => {
  console.log(err); // não está relatando o erro no console.
  process.exit();
});

//= => rotas
// sconst index = require('./routes/index'); se der algum erro foi por essa alteração

const funcionarioRoute = require('./routes/funcionario.routes');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'aplication/vnd.api+json' }));
app.use(morgan('dev'));
app.use(cors());

// app.use('/api', index);
app.get('/', (req, res) => {
  res.send('tudo ok!');
});
app.use('/funcionarios', funcionarioRoute);
module.exports = app;
