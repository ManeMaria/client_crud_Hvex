const express = require("express");
require("dotenv").config();
const path = require('path');
const morgan = require("morgan");
const cors = require("cors");
const dataBase = require('./config/dataBaseConnection');


const app = express();

app.use(dataBase, (error, req, res, next) => {
  if (error) {
    next(error);
  }});

const clientRoute = require("./routes/client_routes");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.json({ type: "aplication/vnd.api+json" }));
//lib p/ visualizar as requisições.
app.use(morgan("dev"));
app.use(cors("*"));

//rotas
app.use("/client", clientRoute);
//linkagem com o front-end views
app.use('/',express.static('public'));
app.all('/*',(req,res) =>{
    res.sendFile( path.join( __dirname, '..','public', 'index.html' ) );
});
//erro exepcionais
app.use(function exceptionalErrosHandler(err, req, res, next) {
  console.error(err.stack);
  res.status(500).json(err);
});
module.exports = app;
