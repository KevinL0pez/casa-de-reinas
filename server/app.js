const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
app.use(bodyParser.json()); // Para datos JSON

// Servicio 1: Saludo
app.get('/saludo', (req, res) => {
  res.send('¡Hola desde el servicio de saludo!');
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

// Servicio POST para recibir datos
app.post('/guardar', (req, res) => {
  const datos = req.body;
  console.log('Datos recibidos:', datos);
  const nombreArchivo = datos.nombre;
  const contenidoBinario = fs.readFileSync(datos.rutaArchivo);
  const consulta = 'INSERT INTO imagenes (nombre, imagen) VALUES (?, ?)';
  connection.query(consulta, [nombreArchivo, contenidoBinario], (error, resultados) => {
    if (error) {
      console.error('Error en la inserción: ' + error.stack);
      return;
    }

    console.log('Imagen insertada con éxito.');

    // Cierra la conexión a la base de datos
    connection.end();
  });
  res.send('Datos recibidos con éxito.');
});

app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});
