const servicioReservas = require("../servicios/reservas");

function mostrarListado(req, res) {
  res.render("reservas/lista", { 
    titulo: "Listado de Reservas", 
    reservas: servicioReservas.obtenerTodas() 
  });
}

function mostrarFormulario(req, res) {
  res.render("reservas/nueva", { titulo: "Nueva Reserva", error: null, valores: {} });
}

function mostrarDetalle(req, res) {
  const id = Number(req.params.id);
  const reserva = servicioReservas.buscarPorId(id);
  
  if (!reserva) {
    return res.status(404).render("no-encontrado", {
      titulo: "Reserva no encontrada",
      mensaje: "No existe una reserva con ese identificador."
    });
  }
  res.render("reservas/detalle", { titulo: `Reserva #${id}`, reserva });
}

function procesarCreacion(req, res) {
  servicioReservas.crear(req.reservaValidada);
  res.redirect("/reservas");
}

function mostrarEstado(req, res) {
  res.json({
    servicio: "activo",
    reservas: servicioReservas.contar(),
    solicitudId: res.locals.solicitudId
  });
}

module.exports = { mostrarListado, mostrarFormulario, mostrarDetalle, procesarCreacion, mostrarEstado };