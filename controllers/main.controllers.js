const ComentarioModel = require("./model/formulario_model.js");

const index = async (req, res) => {
  ComentarioModel.obtenerComentarios((err, comentarios) => {
    if (err) {
      res.status(500).send("Error al obtener comentarios");
    } else {
      res.render("main.views.ejs", { comentarios });
    }
  });
};

const submitComentario = async (req, res) => {
  const { nombre, correo, comentario } = req.body;

  if (!nombre || !correo || !comentario) {
    return res.status(400).send("Faltan datos en el formulario");
  }

  const fechaHora = new Date();
  const fecha = fechaHora.toLocaleDateString();
  const hora = fechaHora.toLocaleTimeString();
  const ip = req.ip;

  ComentarioModel.guardarComentario(nombre, correo, comentario, fecha, hora, ip, (err, id) => {
    if (err) {
      console.error("Error al guardar en BD:", err);
      return res.status(500).send("Error al guardar el comentario");
    }

      res.redirect('/');
    });
  ;
};

module.exports = {
  index,
  submitComentario,
};