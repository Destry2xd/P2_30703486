const axios = require("axios");
const servicioModel = require("./model/productos.model.js");

const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;

const VALID_CARDS = [
  "4111111111111111",
  "5555555555554444",
  "378282246310005",
  "6011111111111117",
  "3530111333300000",
  "30569309025904"
];

// Validar captcha
const verificarCaptcha = async (token) => {
  const params = new URLSearchParams();
  params.append("secret", RECAPTCHA_SECRET_KEY);
  params.append("response", token);

  const response = await axios.post(
    "https://www.google.com/recaptcha/api/siteverify",
    params.toString(),
    { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
  );

  return response.data.success;
};

// Obtener IP
const obtenerIP = (req) => {
  let ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  return (ip === "::1" || ip === "127.0.0.1") ? "8.8.8.8" : ip;
};

// Obtener geolocalización
const obtenerGeoInfo = async (ip) => {
  try {
    const response = await axios.get(`https://ipapi.co/${ip}/json/`);
    return response.data;
  } catch (error) {
    console.error("Error geolocalización:", error);
    return {};
  }
};

// Mostrar servicios
async function mostrarInicioConServicios(req, res) {
  try {
    const servicios = await servicioModel.obtenerServicios();
    res.render("productos.views.ejs", { servicios });
  } catch (error) {
    console.error("Error obteniendo servicios:", error);
    res.status(500).send("Error al obtener los servicios");
  }
}

// Mostrar formulario de pago
async function mostrarFormularioPago(req, res) {
  try {
    const id = req.params.id;
    const servicio = await servicioModel.obtenerServicioPorId(id);
    if (!servicio) return res.status(404).send("Servicio no encontrado");

    res.render("pago.view.ejs", { servicio });
  } catch (error) {
    console.error("Error cargando formulario de pago:", error);
    res.status(500).send("Error al cargar el formulario de pago");
  }
}

// Procesar pago simulado con validaciones
async function procesarPago(req, res) {
  const {
    nombre,
    correo,
    titular,
    tarjeta,
    mes,
    anio,
    cvv,
    moneda,
    'g-recaptcha-response': token
  } = req.body;

  const id = req.params.id;

  // Validar campos obligatorios
  if (!nombre || !correo || !titular || !tarjeta || !mes || !anio || !cvv || !moneda || !token) {
    return res.status(400).send("Todos los campos son obligatorios.");
  }

  try {
    // Validar captcha
    const captchaOk = await verificarCaptcha(token);
    if (!captchaOk) return res.status(403).send("Captcha no verificado.");

    // Validar número de tarjeta
    if (!VALID_CARDS.includes(tarjeta)) {
      return res.status(400).send("Número de tarjeta inválido.");
    }

    // Validar fecha de expiración
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    if (anio < currentYear || (anio == currentYear && mes < currentMonth)) {
      return res.status(400).send("La tarjeta está vencida.");
    }

    // Validar CVV
    if (!/^\d{3,4}$/.test(cvv)) {
      return res.status(400).send("CVV inválido.");
    }

    // Obtener servicio
    const servicio = await servicioModel.obtenerServicioPorId(id);
    if (!servicio) return res.status(404).send("Servicio no encontrado");

    // Geolocalización
    const ip = obtenerIP(req);
    const geoInfo = await obtenerGeoInfo(ip);

    // Simular pago exitoso
    const resultadoPago = {
      status: "approved",
      message: "Pago simulado exitoso",
      reference: `servicio-${id}`
    };

    // Renderizar confirmación
    res.render("pagoRealizado.ejs", {
      servicio,
      ip,
      ubicacion: geoInfo,
      pago: resultadoPago
    });

  } catch (error) {
    console.error("Error al procesar pago:", error);
    res.status(500).send("Error al procesar el pago.");
  }
}

module.exports = {
  mostrarInicioConServicios,
  mostrarFormularioPago,
  procesarPago
};
