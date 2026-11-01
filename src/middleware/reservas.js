const salasPermitidas = ["Sala Norte", "Sala Sur", "Sala Multimedia"];

function prepararAreaReservas(req, res, next) {
  res.locals.seccion = "Reservas de salas";
  next();
}

function validarReserva(req, res, next) {
  const estudiante = String(req.body.estudiante ?? "").trim();
  const email = String(req.body.email ?? "").trim();
  const sala = String(req.body.sala ?? "").trim();
  const fecha = String(req.body.fecha ?? "").trim();
  const turno = String(req.body.turno ?? "").trim();
  const personas = Number(req.body.personas);

  const errores = [];
  if (!estudiante) errores.push("El nombre es obligatorio.");
  if (!email || !email.includes("@")) errores.push("Email inválido.");
  if (!salasPermitidas.includes(sala)) errores.push("Sala no permitida.");
  if (!["Mañana", "Tarde", "Noche"].includes(turno)) errores.push("Turno inválido.");
  if (!Number.isInteger(personas) || personas < 1 || personas > 6) errores.push("La cantidad de personas debe ser entre 1 y 6.");

  if (errores.length > 0) {
    return res.status(400).render("reservas/nueva", {
      titulo: "Nueva Reserva",
      error: errores.join(" "),
      valores: req.body
    });
  }

  req.reservaValidada = { estudiante, email, sala, fecha, turno, personas };
  next();
}

module.exports = { prepararAreaReservas, validarReserva };