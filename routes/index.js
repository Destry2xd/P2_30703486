var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Serviaires' });
});

router.get('/formulario', function(req, res, next) {
  res.render('Formulario', { title: 'Comentarios' });
});

router.get('/precios', function(req, res, next) {
  res.render('Precios', { title: 'Precios' });
});

router.get('/productos', function(req, res, next) {
  res.render('Productos', { title: 'Productos' });
});

router.get('/formulario_pago', function(req, res, next) {
  res.render('Formulario_pago', { title: 'Pagos' });
});

router.get('/exito', function(req, res, next) {
  res.render('Exito', { title: 'exito' });
});

module.exports = router;

