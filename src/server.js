const express = require('express');
const cors = require('cors');

//MULTER
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
})
const upload = multer({storage: storage});

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
app.use(upload.single('file'));

//Router
const productosRouter = require('./routes/productos');
app.use('/api/productos', productosRouter);

app.get('/', (req, res) => {
    res.send(`<h1 style="color:green;font-family:Georgia, serif">Bienvenidos al servidor express de Stefi</h1>`);
})