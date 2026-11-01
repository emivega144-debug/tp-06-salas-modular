const express = require("express");
const router = express.Router();

const { prepararAreaReservas, validarReserva } = require("../middleware/reservas");
const controladores = require("../controladores/reservas");


router.use(prepararAreaReservas);

router.get("/", controladores.mostrarListado);
router.get("/nueva", controladores.mostrarFormulario);
router.get("/estado", controladores.mostrarEstado);
router.get("/:id", controladores.mostrarDetalle);
router.post("/", validarReserva, controladores.procesarCreacion);

module.exports = router;