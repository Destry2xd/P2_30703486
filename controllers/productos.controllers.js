const servicioModel = require("./model/productos.model.js");

// Renderiza todos los servicios
async function mostrarInicioConServicios(req, res) {
  try {
    const servicios = await servicioModel.obtenerServicios();
    res.render("productos.views.ejs", { servicios });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener los servicios");
  }
}

// Renderiza el formulario de pago con el servicio solicitado
async function mostrarFormularioPago(req, res) {
  try {
    const id = req.params.id;
    const servicio = await servicioModel.obtenerServicioPorId(id);
    if (!servicio) return res.status(404).send("Servicio no encontrado");

    res.render("pago.view.ejs", { servicio }); // renderiza pago.ejs
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al cargar el formulario de pago");
  }
}

module.exports = {
  mostrarInicioConServicios,
  mostrarFormularioPago
};
