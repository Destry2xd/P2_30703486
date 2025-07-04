require("dotenv").config();
const path = require("path");
const sqlite = require("sqlite3");

const db = new sqlite.Database(
  path.resolve(__dirname, process.env.DB_PATH || "../Database.db"),
  (error) => {
    if (error) return console.error(error);

    // Crear tabla comentarios con variables
    const sqlComentarios = `
      CREATE TABLE IF NOT EXISTS ${process.env.TABLE_COMENTARIOS} (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        ${process.env.COL_COMENT_NOMBRE} TEXT NOT NULL,
        ${process.env.COL_COMENT_CORREO} TEXT NOT NULL,
        ${process.env.COL_COMENT_TEXTO} TEXT NOT NULL,
        ${process.env.COL_COMENT_FECHA} TEXT NOT NULL,
        ${process.env.COL_COMENT_HORA} TEXT NOT NULL,
        ${process.env.COL_COMENT_IP} TEXT NOT NULL
      )
    `;

    db.run(sqlComentarios, (err) => {
      if (err) return console.error("Error creando tabla comentarios:", err);
      console.log("Tabla comentarios creada o ya existe.");
    });

    // Crear tabla servicios con variables
    const sqlServicios = `
      CREATE TABLE IF NOT EXISTS ${process.env.TABLE_SERVICIOS} (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        ${process.env.COL_SERVICIO_TITULO} TEXT NOT NULL,
        ${process.env.COL_SERVICIO_DESCRIPCION} TEXT NOT NULL,
        ${process.env.COL_SERVICIO_PRECIO} REAL NOT NULL
      )
    `;

    db.run(sqlServicios, (err) => {
      if (err) return console.error("Error creando tabla servicios:", err);
      console.log("Tabla servicios creada o ya existe.");

      // Verifica si hay servicios
      db.get(`SELECT COUNT(*) as count FROM ${process.env.TABLE_SERVICIOS}`, (err, row) => {
        if (err) return console.error("Error contando servicios:", err);

        if (row.count === 0) {
          const servicios = [
            {
              titulo: "Instalación Profesional",
              descripcion: "Instalación de equipos nuevos con garantía.",
              precio: 150.00,
            },
            {
              titulo: "Reparación Rápida",
              descripcion: "Diagnóstico y reparación de fallas.",
              precio: 100.00,
            },
            {
              titulo: "Mantenimiento Preventivo",
              descripcion: "Limpieza y mantenimiento periódico.",
              precio: 80.00,
            },
          ];

          const insertSQL = `
            INSERT INTO ${process.env.TABLE_SERVICIOS}
            (${process.env.COL_SERVICIO_TITULO}, ${process.env.COL_SERVICIO_DESCRIPCION}, ${process.env.COL_SERVICIO_PRECIO})
            VALUES (?, ?, ?)
          `;

          const stmt = db.prepare(insertSQL);
          servicios.forEach((s) => {
            stmt.run(s.titulo, s.descripcion, s.precio);
          });
          stmt.finalize();

          console.log("Servicios insertados correctamente.");
        }
      });
    });
  }
);

module.exports = db;
