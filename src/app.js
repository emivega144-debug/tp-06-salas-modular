const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const morgan = require("morgan");
const path = require("node:path");

const configuracion = require("./configuracion");
const { identificarSolicitud, medirDuracion } = require("./middleware/solicitudes");
const routerReservas = require("./rutas/reservas");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "..", "views"));
app.set("layout", "layouts/main");


const formatoRegistro = configuracion.entorno === "production" ? "combined" : "dev";
app.use(morgan(formatoRegistro));
app.use(identificarSolicitud);
app.use(medirDuracion);
app.use(expressLayouts);
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.get("/", (req, res) => {
  res.render("inicio", { titulo: "Inicio - Sistema de Reservas" });
});


app.use("/reservas", routerReservas);


app.use((req, res) => {
  res.status(404).render("no-encontrado", {
    titulo: "Página no encontrada",
    mensaje: "La dirección solicitada no existe."
  });
});

module.exports = app;