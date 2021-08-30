// aqui é onde ficará o modelo da classe principal: funcionário
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ClientSchema = new Schema({
  name: { type: String, required: true, maxLength: 50 },
  userName: { type: String, required: true },
  password: { type: String, required: true },
}, {
  timestamps: true, // diz o dia e a hora que o dado foi gravado
  collection: 'client',
});

module.exports = mongoose.model('client', ClientSchema);
