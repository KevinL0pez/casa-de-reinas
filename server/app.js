const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // Cambia 'import' a 'require'
const multer = require('multer');
const app = express();
const port = 3000;
app.use(bodyParser.json()); // Para datos JSON

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Ajusta estos métodos según tus necesidades
  })
);

// Configura el middleware para manejar la carga de archivos
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

import {
  buildControllerSaveProduct,
  buildControllerGetProducts,
  buildControllerProducts,
  buildControllerCreateUser,
  buildControllerGetUser,
  buildControllerDeleteProduct,
  builControllerGetProductId,
  buildControllerEditProduct
} from "./controllers";

// Servicio POST para guardar productos
app.post("/guardarproducto", upload.single('imagen'), async (req, res) => {
  const datos = req.body;
  const image = req.file.buffer;
  datos.imagen = image;
  try {
    const response = await buildControllerSaveProduct(datos);
    console.log(response);
    res.status(response.status).json({ message: response.message, status: response.status } );
  } catch (error) {
    console.error(error.message);
    res.status(error.status).json({ message: error.message, status: error.status });
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

app.delete("/eliminarproducto/:id", async (req, res) => {
  const productId = req.params.id; // Captura el ID del producto desde la URL
  try {
    const response = await buildControllerDeleteProduct(productId);
    res.status(response.status).json({ message: response.message, status: response.status } );
  } catch (error) {
    console.error("Ocurrió un error en el servidor:", error);
    res.status(error.status).json({ message: error.message, status: error.status });
  }
});

app.get("/obtenerproducto/:id", async (req, res) => {
  const productId = req.params.id; // Captura el ID del producto desde la URL
  try {
    const response = await builControllerGetProductId(productId);
    res.status(response.status).json({ message: response.message, status: response.status, data: response.data } );
  } catch (error) {
    console.error("Ocurrió un error en el servidor:", error);
    res.status(error.status).json({ message: error.message, status: error.status });
  }
});

// Ruta para registrar un nuevo usuario
app.put("/editarproducto/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const data = req.body;
    data.productId = productId;
    console.log("data", data);
    const response = await buildControllerEditProduct(data);
    res.status(response.status).json({ message: response.message, status: response.status } );
  } catch (error) {
    console.error(error.message);
    res.status(error.status).json({ message: error.message, status: error.status });
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
    const response = await buildControllerCreateUser(data);
    console.log(response);
    res.status(response.status).json({ message: response.message, status: response.status } );
  } catch (error) {
    console.error(error.message);
    res.status(error.status).json({ message: error.message, status: error.status });
  }
});

// Ruta para el inicio de sesión
app.post('/iniciarsesion', async (req, res) => {
  try {
    const data = req.body;
    const response = await buildControllerGetUser(data);
    res.status(response.status).json({ message: response.message, status: response.status, data: response.data } );
  } catch (error) {
    console.error(error);
    res.status(error.status).json({ message: error.message, status: error.status });
  }
});

app.listen(port, () => {
  console.log(`Servidor ejecutandose en el puerto ${port}`);
});
