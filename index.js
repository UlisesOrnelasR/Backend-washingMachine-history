const express = require("express");
const cors = require("cors");
require("dotenv").config(); // Carga las variables de entorno del archivo .env y unicamente es requerido llamarse una vez en el proyecto (index.js) para que esten disponibles en toda la aplicacion
const { dbConnection } = require("./database/config");

// Crear el servidor de express
const app = express();

// Database
dbConnection();

// CORS
app.use(cors());

// Directorio public
app.use(express.static("public"));

//Lectura y parseo del body
app.use(express.json());

//Rutas
app.use("/api/auth", require("./routes/auth")); // Auth
app.use("/api/services", require("./routes/services")); // Services

app.get("*", (req, res) => {
  res.sendFile(__dirname + "/public/index.html"); // Esto es para que siempre se muestre el index.html cuando se ingrese a la aplicacion desde cualquier parte de la pagina web, pero solo cuando no se encuentre en ninguna de las rutas anteriores.
  // res.sendFile(__dirname + "/public/404.html"); // Esto es para que siempre se muestre el index.html cuando se ingrese a la aplicacion desde cualquier parte de la pagina web, pero solo cuando no se encuentre en ninguna de las rutas anteriores.
  // res.sendFile(__dirname + "/public/500.html"); // Esto es para que siempre se muestre el index.html cuando se ingrese a la aplicacion desde cualquier parte de la pagina web, pero solo cuando no se encuentre en ninguna de las rutas anteriores.
});

// Escuchar peticiones
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo ${process.env.PORT} `);
});
