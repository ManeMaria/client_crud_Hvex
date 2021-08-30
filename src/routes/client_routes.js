/*
* o padrão é ter arquivos de rota espefífico para cada api
* e um arquivo geral chamando 'route', lá onde será definido
* se uma rotá é pública ou privada
*/
const express = require('express');

const router = express.Router();
const controller = require('../controllers/client_controllers');
// const Funcionario = require('../models/funcionario.model');
/// -> definindo a rota do funcionario

router.post('/create', controller.create);
router.get('/findAll', controller.findAll);
router.get('/search/:id', controller.findById);
router.put('/update/:id', controller.uptade);
router.delete('/delete/:id', controller.delete);

module.exports = router;
