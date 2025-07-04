const db = require("../../bd/sqlite3");

function obtenerServicios() {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM servicios", (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

function obtenerServicioPorId(id) {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM servicios WHERE id = ?", [id], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}

module.exports = { obtenerServicios, obtenerServicioPorId };
