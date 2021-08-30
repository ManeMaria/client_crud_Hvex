const mongoose = require('mongoose');
// no config onde ficará toda a lógica do bd
// ele é responsável pelas connectionsStrings do app: MongDB & CosmosDB
const DATABASEURL = process.env.DATABASE_URL;
// --> conexão com a base de dados
mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);

module.exports = mongoose.connect(DATABASEURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}, { useNewUrlParser: true }).then(() => {
  console.log('a base foi conectada com sucesso');
},
(err) => {
  console.log(err); // não está relatando o erro no console.
  process.exit();
});
