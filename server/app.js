const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // Cambia 'import' a 'require'

const app = express();
const port = 3000;
app.use(bodyParser.json()); // Para datos JSON

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Ajusta estos métodos según tus necesidades
  })
);

import {
  buildControllerSaveProduct,
  buildControllerGetProducts,
  buildControllerProducts,
  buildControllerCreateUser,
  buildControllerGetUser
} from "./controllers";

// Servicio POST para guardar productos
app.post("/guardar", async (req, res) => {
  const datos = req.body;
  try {
    await buildControllerSaveProduct(datos);
    res.status(201).send("Producto guardado exitosamente.");
  } catch (error) {
    console.error("Ocurrió un error en el servidor:", error);
    res
      .status(500)
      .send(
        "Error al guardar el producto. Por favor, inténtalo de nuevo más tarde."
      );
  }
});

// Servicio GET para traer imagenes por una categoría
app.get("/obtenerproductos", async (req, res) => {
  try {
    const categoria = req.query.categoria;

    if (!categoria) {
      res.status(400).send("No se proporcionó la categoría de productos.");
      return;
    }

    const productos = await buildControllerGetProducts(categoria);

    if (productos.length === 0) {
      res
        .status(404)
        .send(`No se encontraron productos en la categoría: ${categoria}`);
    } else {
      // Configura un tipo de contenido genérico para datos binarios
      res.contentType("application/octet-stream");

      // Envía los datos binarios de la imagen como respuesta
      res.status(200).json(productos);
    }
  } catch (error) {
    console.error("Ocurrió un error en el servidor:", error);
    res
      .status(500)
      .send(
        "Error al obtener los productos. Por favor, inténtalo de nuevo más tarde."
      );
  }
});

// Servicio GET para traer imagenes por una categoría
app.get("/productos", async (req, res) => {
  try {
    const productos = await buildControllerProducts();

    if (productos.length === 0) {
      res.status(404).send(`No se encontraron productos registrados.`);
    } else {
      // Configura un tipo de contenido genérico para datos binarios
      res.contentType("application/octet-stream");

      // Envía los datos binarios de la imagen como respuesta
      res.status(200).json(productos);
    }
  } catch (error) {
    console.error("Ocurrió un error en el servidor:", error);
    res
      .status(500)
      .send(
        "Error al obtener los productos. Por favor, inténtalo de nuevo más tarde."
      );
  }
});

// Ruta para registrar un nuevo usuario
app.post("/registrarusuario", async (req, res) => {
  try {
    const data = req.body;
    await buildControllerCreateUser(data);
    res.status(201).send("Usuario guardado exitosamente.");
  } catch (error) {
    console.error("Ocurrió un error en el servidor:", error);
    res
      .status(500)
      .send(
        "Error al momento de crear el usuario."
      );
  }
});

// Ruta para el inicio de sesión
app.post('/iniciarsesion', async (req, res) => {
  try {
    const data = req.body;
    const response = await buildControllerGetUser(data);
    res.status(response.status).send(response.message);
  } catch (error) {
    console.error(error.message);
    res.status(error.status).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Servidor ejecutandose en el puerto ${port}`);
});
