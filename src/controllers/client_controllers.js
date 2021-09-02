/* eslint-disable no-unused-vars */
const ClientSchema = require("../models/client_model");
const isEmpty = require("../util/functions/isEmpty");
const bcrypt = require("bcrypt");

// cadastra um novo cliente
exports.create = async (req, res, next) => {
  try {
    const { name, userName, password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    //verifica se os campos estão vazios
    if (!name.trim() || !userName.trim() || !password.trim()) {
      res.status(401).json({
        status: false,
        message: "campos vazios",
      });
      return;
    }
    //verifica se são diferentes de string
    if (
      typeof name !== "string" ||
      typeof userName !== "string" ||
      typeof password !== "string"
    ) {
      res.status(401).json({
        status: false,
        message: "apenas texto",
      });
      return;
    }
    //verifica se houve algum problema na criptografia
    if (!hash) {
      res.status(500).json({
        status: false,
        message: error.message,
      });
      return;
    }
    //cria o doc no db
    const newClient = await ClientSchema.create({
      name,
      userName,
      password: hash,
    });

    //verifica a resposta do bd
    if (isEmpty(newClient)) {
      res.status(500).json({ message: "erro ao cadastrar o cliente" });
    } else {
      const { _id, name, userName, updatedAt } = newClient;
      //exibe para o cliente, se salvo
      const clientData = {
        identificador: _id,
        nome: name,
        senha: password,
        nomeDeUsuario: userName,
        ultimoAcesso: updatedAt, //PROCURAR UM LIB PRA CONVERTER
      };
      res
        .status(200)
        .json({ usuario: clientData, message: "cadastro feito com sucesso" });
    }
  } catch (err) {
    next(err);
    console.log(`erro: ${err.message}`);
  }
};

// lista todos os clientes
exports.findAll = async (req, res, next) => {
  try {
    const Clients = await ClientSchema.find({}).sort({ "createdAt" : -1 });
    let clientData = [];
    for(key of Clients){
      const { _id, name, userName, updatedAt } = key;

      clientData.push({
        identificador: _id,
        nome: name,
        nomeDeUsuario: userName,
        ultimoAcesso: updatedAt, //PROCURAR UM LIB PRA CONVERTER
      })
    }
    res.status(200).json({clientes: clientData});
  } catch (err) {
    next(err);
    res.status(500).json({ message: err.message });
  }
};

exports.findById = async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    res.status(401).json({ message: "campo de id vazio" });
    return;
  }
  try {
    const client = await ClientSchema.findById(id);
    if (isEmpty(client)) {
      res.status(404).json({ message: "cliente não encontrado :c" });
    } else {
      const {
        _id: identificador,
        name: nome,
        userName: nomeDeUsuario,
      } = client;
      const clientDada = {
        identificador,
        nome,
        nomeDeUsuario,
      };
      res.status(200).json(clientDada);
    }
  } catch (error) {
    next(error);
    res.status(500).json(error.message);
  }
};

// atualiza um funcionárioks
exports.uptade = async (req, res, next) => {
  const { id } = req.params;
  const { name, userName, password } = req.body;
  if (!id) {
    res.status(401).json({ message: "campo de id vazio" });
    return;
  }
  //verifica se são diferentes de string
  if (
    typeof name !== "string" ||
    typeof userName !== "string" ||
    typeof password !== "string"
  ) {
    res.status(401).json({
      status: false,
      message: "apenas texto",
    });
    return;
  }
  //verifica se os campos estão vazios
  if (!name.trim() || !userName.trim() || !password.trim()) {
    res.status(401).json({
      status: false,
      message: "campos vazios",
    });
    return;
  }

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  //verifica se houve algum problema na criptografia
  if (!hash) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
    return;
  }
  try {
    //pesquisa o usuário pelo id e atualiza seus valores
    const ClientAtualizado = await ClientSchema.findByIdAndUpdate(
      id,
      {
        name,
        userName,
        password: hash,
      },
      { new: true }
    );
    //verifica a resposta do bd
    if (isEmpty(ClientAtualizado)) {
      res
        .status(500)
        .json({ message: "erro ao atualizar os dados do cliente" });
    } else {
      const { _id, name, userName, updatedAt } = ClientAtualizado;
      //exibe para o cliente, se salvo
      const clientData = {
        identificador: _id,
        nome: name,
        senha: password,
        nomeDeUsuario: userName,
        ultimoAcesso: updatedAt, //PROCURAR UM LIB PRA CONVERTER
      };
      res
        .status(200)
        .json({
          usuario: clientData,
          message: "atualização realizada com sucesso",
        });
    }
  } catch (error) {
    if (error.kind === "objectId") {
      res
        .status(404)
        .json({ message: `erro ao encontrar o funcinário(a)${id}` });
    }
    next(error);
    res.status(500).json({
      message: `dados do funcionário ${id} não podem ser atualizados`,
    });
  }
};

exports.delete = async (req, res, next) => {
  const { id } = req.params;
  //verifica se há id nos params
  if (!id) {
    res.status(401).json({ message: "campo de id vazio" });
    return;
  }
  try {
    //pesquisa o cliente pelo id e o deleta
    const clientDeleted = await ClientSchema.findByIdAndDelete(id);
    //verifica se o db deletou o cliente.
    if (isEmpty(clientDeleted)) {
      res
        .status(404)
        .json({ message: `o cliente de identificador ${id} não foi encontrado(a)` });
      return;
    }
    //atualiza caso suceeso
    res.status(200).json({
      message: `o client de identificador ${id} foi deletado com sucesso`,
    
    });
  } catch (error) {
    next(error);
      //verifica em casos de erro excepcionais: conexão, etc.
    if (error.kind === "ObjectId") {
      res
        .status(404)
        .json({ message: `o client de identificador ${id} não foi encontrado(a)` });
    }
    res
      .status(500)
      .json({ message: `Erro ao excluir o cliente ${id}`});
  }
};
