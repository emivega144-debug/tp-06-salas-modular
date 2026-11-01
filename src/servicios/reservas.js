let reservas = [
  { id: 1, estudiante: "Juan Perez", email: "juan@test.com", sala: "Sala Norte", fecha: "2026-10-30", turno: "Mañana", personas: 3 },
  { id: 2, estudiante: "Ana Gomez", email: "ana@test.com", sala: "Sala Sur", fecha: "2026-10-31", turno: "Tarde", personas: 2 },
  { id: 3, estudiante: "Luis Silva", email: "luis@test.com", sala: "Sala Multimedia", fecha: "2026-11-01", turno: "Noche", personas: 5 },
  { id: 4, estudiante: "Maria Paz", email: "maria@test.com", sala: "Sala Norte", fecha: "2026-11-02", turno: "Mañana", personas: 1 }
];

function obtenerTodas() {
  return reservas;
}

function contar() {
  return reservas.length;
}

function buscarPorId(id) {
  return reservas.find((r) => r.id === id);
}

function crear(datosReserva) {
  const ultimoId = reservas.reduce((mayor, r) => Math.max(mayor, r.id), 0);
  const nuevaReserva = { id: ultimoId + 1, ...datosReserva };
  reservas.push(nuevaReserva);
  return nuevaReserva;
}

module.exports = { obtenerTodas, contar, buscarPorId, crear };