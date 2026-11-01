const configuracion = {
  puerto: process.env.PORT ? Number(process.env.PORT) : 3000,
  entorno: process.env.NODE_ENV || "development"
};

if (!Number.isInteger(configuracion.puerto) || configuracion.puerto < 1 || configuracion.puerto > 65535) {
  throw new Error("El puerto debe ser un número entero entre 1 y 65535.");
}

module.exports = configuracion;