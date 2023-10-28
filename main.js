// Server.js
const express = require("express");
const app = express();
const path = require('path');

// Middleware para servir archivos estáticos desde un directorio (por ejemplo, 'public')
app.use(express.static('public', { index: false })); // Excluye el manejo de index.html por defecto

// Manejo de rutas
app.get('/', (req, res) => {
    // Ruta de la página de inicio
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

app.get('/home', (req, res) => {
    // Ruta de la página de inicio
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

app.get('/products', (req, res) => {
    // Ruta de la página de productos
    res.sendFile(path.join(__dirname, 'public', 'products.html'));
});

app.get('/contact', (req, res) => {
    // Ruta de la página de contacto
    res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

app.get('/services', (req, res) => {
    // Ruta de la página de servicios
    res.sendFile(path.join(__dirname, 'public', 'services.html'));
});

app.get('/login', (req, res) => {
    // Ruta de la página de servicios
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Redirección de rutas no encontradas a la página de inicio
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

// Iniciar el servidor en el puerto 5500
app.listen(5500, () => {
    console.log('Servidor en ejecución en el puerto 5500');
});