const db = require  ("../../bd/sqlite3");

const ComentarioModel = {
    guardarComentario: (nombre, correo, comentario, fecha, hora, ip, callback) => {
            const sql = "INSERT INTO comentarios (nombre, correo, comentario, fecha, hora, ip) VALUES (?, ?, ?,?, ?, ?)";
            db.run(sql, [nombre, correo, comentario, fecha, hora, ip], function(err) {
                callback(err, this.lastID);
            });
        },

        obtenerComentarios: (callback) => {
            const sql = "SELECT * FROM comentarios ORDER BY id DESC";
            db.all(sql, [], (err, rows) => {
                callback(err, rows);
            });
        }
    };

    module.exports = ComentarioModel;
