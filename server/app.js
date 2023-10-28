const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
app.use(bodyParser.json()); // Para datos JSON

import {
  buildControllerSaveProduct
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
  await buildControllerSaveProduct(datos)
  res.send("Producto guardado exitosamente.");
});

app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});
