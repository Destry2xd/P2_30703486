const express = require("express");
const router = express.Router();
const adminComentariosController = require("../controllers/admin.controllers.js");

// Mostrar todos los comentarios
router.get("/Admin", adminComentariosController.mostrarComentarios);

// Eliminar un comentario
router.post("/Admin/eliminar/:id", adminComentariosController.eliminarComentario);

module.exports = router;