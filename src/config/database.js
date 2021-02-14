// no config onde ficará toda a lógica do bd
// ele é responsável pelas connectionsStrings do app: MongDB & CosmosDB

module.exports = {
  local: {
    localURL: `mongodb+srv://deploy:${process.env.PASSAWORD_MONGODB_ATLAS}@cluster0.kzyvu.mongodb.net/<dbname>?retryWrites=true&w=majority`,
    // localURL: 'mongodb://localhost:27017/crudTutorial',
  },
};
