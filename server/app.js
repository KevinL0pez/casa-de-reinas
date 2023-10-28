const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
app.use(bodyParser.json()); // Para datos JSON

import {
  buildControllerSaveProduct,
  buildControllerGetProducts,
  buildControllerProducts
} from "./controllers";

// Servicio 1: Saludo
app.get('/saludo', (req, res) => {
  res.send('¡Hola desde el servicio!');
});

// Servicio 2: Hora actual
app.get('/hora', (req, res) => {
  const horaActual = new Date().toLocaleTimeString();
  res.send(`La hora actual es: ${horaActual}`);
});

// Servicio 3: Suma de números
app.get('/suma/:num1/:num2', (req, res) => {
  const num1 = parseInt(req.params.num1);
  const num2 = parseInt(req.params.num2);
  const resultado = num1 + num2;
  res.send(`La suma de ${num1} y ${num2} es igual a ${resultado}`);
});

// Servicio POST para guardar productos
app.post('/guardar', async (req, res) => {
  const datos = req.body;
  try {
    await buildControllerSaveProduct(datos);
    res.status(201).send("Producto guardado exitosamente.");
  } catch (error) {
    console.error("Ocurrió un error en el servidor:", error);
    res.status(500).send("Error al guardar el producto. Por favor, inténtalo de nuevo más tarde.");
  }
});

// Servicio GET para traer imagenes por una categoría
app.get('/obtenerproductos', async (req, res) => {
  try {
    const categoria = req.query.categoria;

    if (!categoria) {
      res.status(400).send('No se proporcionó la categoría de productos.');
      return;
    }

    const productos = await buildControllerGetProducts(categoria);

    if (productos.length === 0) {
      res.status(404).send(`No se encontraron productos en la categoría: ${categoria}`);
    } else {
      // Configura un tipo de contenido genérico para datos binarios
      res.contentType('application/octet-stream');
      
      // Envía los datos binarios de la imagen como respuesta
      res.status(200).json(productos);
    }
  } catch (error) {
    console.error("Ocurrió un error en el servidor:", error);
    res.status(500).send("Error al obtener los productos. Por favor, inténtalo de nuevo más tarde.");
  }
});

// Servicio GET para traer imagenes por una categoría
app.get('/productos', async (req, res) => {
  try {

    const productos = await buildControllerProducts();

    if (productos.length === 0) {
      res.status(404).send(`No se encontraron productos registrados.`);
    } else {
      // Configura un tipo de contenido genérico para datos binarios
      res.contentType('application/octet-stream');
      
      // Envía los datos binarios de la imagen como respuesta
      res.status(200).json(productos);
    }
  } catch (error) {
    console.error("Ocurrió un error en el servidor:", error);
    res.status(500).send("Error al obtener los productos. Por favor, inténtalo de nuevo más tarde.");
  }
});

app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});
