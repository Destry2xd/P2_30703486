const db = require("../../bd/sqlite3");
const {
  TABLE_COMENTARIOS,
  COL_COMENT_NOMBRE,
  COL_COMENT_CORREO,
  COL_COMENT_TEXTO,
  COL_COMENT_FECHA,
  COL_COMENT_HORA,
  COL_COMENT_IP,
} = process.env;

const Comentarios = {
  obtenerTodos: (callback) => {
    const sql = `SELECT * FROM ${TABLE_COMENTARIOS} ORDER BY ${COL_COMENT_FECHA} DESC, ${COL_COMENT_HORA} DESC`;
    db.all(sql, (err, rows) => {
      if (err) return callback(err);
      callback(null, rows);
    });
  },

  eliminarPorId: (id, callback) => {
    const sql = `DELETE FROM ${TABLE_COMENTARIOS} WHERE id = ?`;
    db.run(sql, [id], function (err) {
      if (err) return callback(err);
      callback(null, { deletedRows: this.changes });
    });
  },
};

module.exports = Comentarios;