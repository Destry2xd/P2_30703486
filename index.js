require ("dotenv").config();

const express = require("express");

const app = express();

const path = require("path");

const layouts = require("express-ejs-layouts");

app.use(express.static(path.join(__dirname, "public"))); 

const main = require("./routes/main.routes");

const admin = require("./routes/admin.routes");



const productos = require("./routes/productos.routes");

app.use(express.urlencoded({ extended: true }));

app.use(layouts);

app.set("layout", "layouts/layout");

app.set("view engine", "ejs"); 

app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname,"public")));
app.use(admin);
app.use(main);
app.use(productos);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>  console.log(`http://localhost:${PORT}`));

