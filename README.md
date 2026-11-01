# Trabajo práctico 06 - Refactorización modular

## Proyecto de partida y cambios
Se utilizó como base el TP 05 funcional. Se refactorizó la aplicación hacia una arquitectura modular separando configuración, rutas, controladores, servicios y middleware. Se conservaron intactos el layout, las vistas EJS, el CSS y las respuestas HTTP.

## Instalación y ejecución
- Instalar dependencias: npm install
- Iniciar servidor (configuración por defecto): npm start
- Iniciar servidor con variables de entorno: npm run start:local

## Configuración del entorno
Se utiliza un archivo .env (ignorado en Git) basado en .env.example`.
- PORT: Define el puerto del servidor (ej. 3000). Si es inválido, el programa no inicia.
- NODE_ENV: Alterna el formato de registro de Morgan (development o production).

## Mapa de módulos y dependencias
- src/index.js: Inicia el servidor (listen).
- src/app.js: Configura Express, vistas y monta rutas.
- src/configuracion.js: Valida las variables de entorno.
- src/rutas/reservas.js: Asocia cada ruta con su middleware y controlador.
- src/controladores/reservas.js: Maneja peticiones (req) y respuestas HTTP (res).
- src/servicios/reservas.js: Gestiona la lógica de datos y el arreglo en memoria.
- src/middleware/: Contiene la validación del formulario y las métricas de solicitud.

## Pipeline y contrato de rutas
Pipeline: Morgan -> ID de solicitud -> Medición de tiempo -> Layouts -> Archivos estáticos -> Parseo URL/JSON -> Rutas Base -> Rutas /reservas -> Error 404.

**Contrato de rutas:**
- `GET /`, `GET /estado`, `GET /reservas`, `GET /reservas/nueva`: Responden 200 OK.
- `GET /reservas/:id`: Responde 200 (si existe) o 404 HTML (si no existe).
- `POST /reservas`: Responde 302 (éxito y redirección) o 400 (error de validación).

## Matriz antes/después
| Caso | Esperado | Evidencia post-refactorización |
|---|---|---|
| Inicio y CSS | 200 | Interfaz carga correctamente con su CSS y muestra ID. |
| Estado inicial | 200 | JSON con estado activo y 4 reservas. |
| Listado y detalle | 200 | Se listan las 4 reservas originales. |
| Detalle inexistente | 404 | Renderiza la vista de error 404 HTML. |
| Formulario | 200 | Carga vista del formulario limpia. |
| POST inválido | 400 | Muestra el error en pantalla, no guarda los datos. |
| POST válido | 302 y 200 | Redirige al listado mostrando la nueva reserva. |
| Reinicio | 200 | La reserva nueva desaparece, regresando a las 4 iniciales. |
| Puerto inválido | Falla | El servidor se detiene con error en consola. |

## Formato y análisis estático
Se ejecutaron los siguientes comandos comprobando que no hay errores de código:
- npm run format: (Aplica Prettier)
- npm run format:check (Verifica formato)
- npm run lint: (Verifica reglas de ESLint)
- npm run check: (Ejecuta la comprobación completa)

## Persistencia temporal y límites
- **¿Por qué el servicio no usa `res`?** 
  Para separar responsabilidades. El servicio solo maneja datos, lo que permite reutilizarlo sin depender de la web o de Express.
- **¿Qué hace el controlador?** 
  Hace de puente: extrae datos de la petición, llama al servicio para operarlos, y envía el resultado final al cliente usando vistas o JSON.
- **¿Por qué el router declara caminos relativos?** 
  Para mantener el código modular. Permite cambiar la URL base en `app.js` (ej. montar en `/reservas` o en `/turnos`) sin modificar el archivo de rutas interno.
- **¿Dónde vive el único arreglo de reservas y qué ocurrirá al reiniciar?** 
  Vive en la memoria RAM dentro de `src/servicios/reservas.js`. Al reiniciar el servidor, se pierde cualquier cambio y el arreglo vuelve a su estado original de 4 reservas.

  ## Preguntas ##

- ¿Por qué el servicio no usa res?
  Para separar responsabilidades. El servicio solo maneja datos, lo que permite reutilizarlo sin depender de la web o de Express.
- ¿Qué hace el controlador? 
  Hace de puente: extrae datos de la petición, llama al servicio para operarlos, y envía el resultado final al cliente usando vistas o JSON.
- ¿Por qué el router declara caminos relativos?
  Para mantener el código modular. Permite cambiar la URL base en app.js (ej. montar en /reservas o en /turnos) sin modificar el archivo de rutas interno.
- **¿Dónde vive el único arreglo de reservas y qué ocurrirá al reiniciar?** 
  Vive en la memoria RAM dentro de src/servicios/reservas.js. Al reiniciar el servidor, se pierde cualquier cambio y el arreglo vuelve a su estado original de 4 reservas.