/* eslint-disable no-unused-vars */
const Funcionario = require('../models/funcionario.model');

// cria um novo funcionário
exports.create = async (req, res, next) => {
  try {
    const novoFunc = new Funcionario(req.body);
    // const { nomeDoFuncionario, cargo, numeroIdentificadorDoFuncionario } = novoFunc;
    // const  = novoFunc;

    const funcionario = await novoFunc.save();
    res.status(200).send({ message: 'cadastro feito com sucesso', funcionario });
  } catch (err) {
    next(err);
    console.log(`erro: ${err.message}`);
  }
};

// lista todos os funcionários
exports.findAll = async (req, res, next) => {
  try {
    const funcionarios = await Funcionario.find({});
    res.status(200).send(funcionarios);
  } catch (err) {
    next(err);
    res.status(500).send({ message: err.message });
  }
};

exports.findById = async (req, res, next) => {
  if (!req.params.id) {
    res.status(404).send({ message: 'id não encontrado' });
  }
  try {
    const funcionario = await Funcionario.findById(req.params.id);
    console.log(funcionario);
    res.status(200).send(JSON.stringify(funcionario));
  } catch (error) {
    next(error);
    res.status(400).send(error.message);
  }
};

// atualiza um funcionárioks
exports.uptade = async (req, res, next) => {
  const { nomeDoFuncionario, cargo, numeroIdentificadorDoFuncionario } = req.body;
  if (!nomeDoFuncionario || !cargo || !numeroIdentificadorDoFuncionario) {
    res.status(400).send({ message: 'os campos não podem estar vazios' });
    next(); // em excessões, sempre colocar o next()
  }
  try {
    const funcionarioAtualizado = await Funcionario.findByIdAndUpdate(
      req.params.id,
      {
        nomeDoFuncionario,
        cargo,
        numeroIdentificadorDoFuncionario,
      },
      { new: true },
    );
    res.status(200).send({ message: 'FUNCIONÁRIO ATUALIZADO COM SUCESSO', funcionarioAtualizado });
  } catch (error) {
    if (error.kind === 'objectId') {
      res.status(404).send({ message: `erro ao encontrar o funcinário(a)${req.params.id}` });
    }
    next(error);
    res.status(500).send({ message: `dados do funcionário ${req.params.id} não podem ser atualizados` });
  }
};

exports.delete = async (req, res, next) => {
  try {
    const funcionarioDeletado = await Funcionario.findByIdAndDelete(req.params.id);
    if (!funcionarioDeletado) {
      res.status(404).send({ message: 'o funcionário(a) não foi encontrado(a)' });
      next();
    }
    res.status(200)
      .send({ message: 'o funcionário(a) deletado com sucesso!', funcionarioDeletado });
  } catch (error) {
    next(error);
    if (error.kind === 'ObjectId') {
      res.status(404).send({ message: 'o funcionário(a) não foi encontrado(a)' });
    }
    res.status(500).send({ message: `Erro ao excluir o funcionário ${req.params.id}` });
  }
};
