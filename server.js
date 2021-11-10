const express = require('express');

const Contenedor = require('./ClassContenedor');

const a = new Contenedor;

const app = express();
const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en ${PORT}`);
})

server.on('error', (error) => console.log(`Error en el servidor: ${error}`));

app.get('/', (req, res) => {
    res.send(`<h1 style="color:green;font-family:Georgia, serif">Bienvenidos al servidor express de Stefi</h1>`);
})

app.get('/productos', async (req, res) => {
    let productos = await a.getAll();
    res.send(productos);
})

app.get('/random', async (req, res) => {
    let producto = await a.getRandom();
    res.send(producto);
})