const app = require("./app");
const configuracion = require("./configuracion");

app.listen(configuracion.puerto, () => {
  console.log(`Aplicación en entorno ${configuracion.entorno} disponible en http://localhost:${configuracion.puerto}`);
});