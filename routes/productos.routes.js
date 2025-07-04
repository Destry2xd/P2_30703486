const express = require("express");
const router = express.Router();

const servicioController = require("../controllers/productos.controllers.js");

router.get("/servicios", servicioController.mostrarInicioConServicios);
router.get("/pago/:id", servicioController.mostrarFormularioPago); // nueva ruta

router.post("/pago/:id", servicioController.procesarPago); // nueva ruta
module.exports = router;
