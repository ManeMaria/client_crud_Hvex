// aqui é onde ficará o modelo da classe principal: funcionário
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const funcionarioSchema = new Schema({
  nomeDoFuncionario: { type: String, required: true, maxLength: 50 },
  cargo: { type: String, required: true },
  numeroIdentificadorDoFuncionario: { type: Number, required: true },
}, {
  timestamps: true, // diz o dia e a hora que o dado foi gravado
  collection: 'funcionario',
});

module.exports = mongoose.model('Funcionario', funcionarioSchema);
