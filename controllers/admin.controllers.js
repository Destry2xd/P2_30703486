const Comentarios = require("./model/adminModel.js");

const adminComentariosController = {
  mostrarComentarios: (req, res) => {
    Comentarios.obtenerTodos((err, comentarios) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error al obtener comentarios");
      }
      res.render("admin.views.ejs", {
  comentarios,
  COL_COMENT_NOMBRE: process.env.COL_COMENT_NOMBRE,
  COL_COMENT_CORREO: process.env.COL_COMENT_CORREO,
  COL_COMENT_TEXTO: process.env.COL_COMENT_TEXTO,
  COL_COMENT_FECHA: process.env.COL_COMENT_FECHA,
  COL_COMENT_HORA: process.env.COL_COMENT_HORA,
  COL_COMENT_IP: process.env.COL_COMENT_IP
});
    });
  },

  eliminarComentario: (req, res) => {
    const id = req.params.id;
    if (!id) return res.status(400).send("ID no proporcionado");

    Comentarios.eliminarPorId(id, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error al eliminar comentario");
      }
      if (result.deletedRows === 0) {
        return res.status(404).send("Comentario no encontrado");
      }
      res.redirect("/admin");
    });
  },
};

module.exports = adminComentariosController;
