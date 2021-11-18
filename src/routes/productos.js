const express = require('express');
const router = express.Router();
const Contenedor = require('../classes/ClassContenedor');
const contenedor = new Contenedor();

//GETS
router.get('/', async (req, res) => {
    let productos = await contenedor.getAll();
    res.send(productos);
})

router.get('/:pid', (req, res) => {
    let id = parseInt(req.params.pid);
    contenedor.getByID(id).then(result => {
        res.send(result);
    })
})

router.get('/random', async (req, res) => {
    let producto = await contenedor.getRandom();
    res.send(producto);
})

//POSTS
router.post('/', (req, res) => {
    let producto = req.body;
    console.log(producto);
    contenedor.save(producto).then(result => {
        res.send(result);
    })
})

//PUTS
router.put('/:pid', (req, res) => {
    let body = req.body;
    let id = parseInt(req.params.pid);
    contenedor.updateById(id,body).then(result => {
        res.send(result);
    })
})

//DELETES
router.delete('/pid', (req, res) => {
    let id = parseInt(req.params.pid);
    contenedor.deleteById(id).then(result => {
        res.send(result)
    })
})


module.exports = router;