require("dotenv").config();
const express = require("express");
const app = express();
const path = require('path');
const morgan = require("morgan");
const cors = require("cors");
const dataBase = require('./config/dataBaseConnection');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./documentation/swagger.json');
const clientRoute = require("./routes/client_routes");
//documentação
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(dataBase, (error, req, res, next) => {
  if (error) {
    next(error);
  }});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.json({ type: "aplication/vnd.api+json" }));
//lib p/ visualizar as requisições.
app.use(morgan("dev"));
app.use(cors("*"));
//rotas da api
app.use("/client", clientRoute);
//linkagem com o front-end (views)
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
