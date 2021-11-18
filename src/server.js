const express = require('express');
const cors = require('cors');

//EXPRESS
const app = express();
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en ${PORT}`);
})
server.on('error', (error) => console.log(`Error en el servidor: ${error}`));

//Clase contenedora
const Contenedor = require('./classes/ClassContenedor');
const contenedor = new Contenedor;

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors());

//Router
const productosRouter = require('./routes/productos');
app.use('/api/productos', productosRouter);

app.get('/', (req, res) => {
    res.send(`<h1 style="color:green;font-family:Georgia, serif">Bienvenidos al servidor express de Stefi</h1>`);
})