const express = require("express");
const router = express.Router();

const servicioController = require("../controllers/productos.controllers.js");

router.get("/servicios", servicioController.mostrarInicioConServicios);
router.get("/pago/:id", servicioController.mostrarFormularioPago); // nueva ruta

router.post("/pago/realizado", (req, res) => {
  res.send(`<h2>¡Gracias por tu compra!</h2><p>Servicio adquirido: ${req.body.servicio}</p>`);
});

module.exports = router;
