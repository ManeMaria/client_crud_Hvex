const app = require('./src/app');

const port = process.env.PORT || 8000;

app.listen(port);
console.log('aplicação rodando na porta:', port);

/**
 * router.get('/', (req, res) => {
  res.json({ message: 'ok' });
});
 *
*/
