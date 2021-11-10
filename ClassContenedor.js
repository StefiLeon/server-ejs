const fs = require('fs');

class Contenedor {
    
    async save(producto) {
        try {
            let data = await fs.promises.readFile('./files/productos.txt', "utf-8")
            let productos = JSON.parse(data);
            if(productos.some(pdt => pdt.title === producto.title)) {
                console.log("El producto ya existe.");
                return {status: "error", message: "El producto ya existe"}
            } else {
                let dataProductos = {
                    id: producto.id,
                    title: producto.title,
                    price: producto.price,
                    thumbnail: producto.thumbnail
                }
                productos.push(dataProductos);
                try {
                    await fs.promises.writeFile('./files/productos.txt', JSON.stringify(productos, null, 2))
                } catch(err) {
                    return {status:"Error", message: "No se creo el producto."}
                }
            }
        } catch {
            let dataProductos = {
            id: producto.id,
            title: producto.title,
            price: producto.price,
            thumbnail: producto.thumbnail
            }
            try {
                await fs.promises.writeFile('./files/productos.txt', JSON.stringify([dataProductos], null, 2))
                return {status: "success", message: "Producto creado con exito."}
            } catch(err) {
                console.log("No se pudo crear el producto.");
                return {status: "error", message: `No se pudo crear, ${err}`}
            }
        }
    }

    async getByID(id) {
        try {
            let data = await fs.promises.readFile('./files/productos.txt', 'utf-8');
            let productos = JSON.parse(data);
            let producto = productos.find(i => i.id === id)
            if(producto) {
                console.log(producto);
                return {status: "success", producto: producto, message: "Producto encontrado"}
            } else {
                console.log("Producto no encontrado");
                return {status:"error", message:"Producto no encontrado"}
            }
        } catch(err) {
            console.log("No se puede leer el archivo");
            return {status: "error", message:"No se puede leer el archivo"}
        }
    }

    async getRandom() {
        try {
            let data = await fs.promises.readFile('./files/productos.txt', 'utf-8');
            let productos = JSON.parse(data);
            let random = Math.floor(Math.random() * productos.length+1);
            let producto = productos.find(i => i.id === random)
            return {status: "success", producto: producto, message: "Producto random"}
        } catch(err) {
            console.log("No se puede leer el archivo");
            return {status: "error", message:"No hay producto random"}
        }
    }

    async getAll() {
        try {
            let data = await fs.promises.readFile('./files/productos.txt', 'utf-8');
            let productos = JSON.parse(data);
            if(productos) {
                console.log(productos);
                return {status: "success", lista: productos}
            }
        } catch(err) {
            return {status:"error", message:"No se puede leer el archivo"}
        }
    }

    async deleteById(id) {
        try {
            let data = await fs.promises.readFile('./files/productos.txt', 'utf-8');
            let productos = JSON.parse(data);
            let newArray = productos.filter(i => i.id !== id)
            await fs.promises.writeFile('./files/productos.txt', JSON.stringify(newArray, null, 2));
        } catch(err) {
            console.log("No anda");
            return {status: "error", message: "No se puede leer el archivo para borrar el producto"}
        }
    }

    async deleteAll() {
        try {
            let data = await fs.promises.readFile('./files/productos.txt', 'utf-8');
            let newArray = [];
            await fs.promises.writeFile('./files/productos.txt', newArray, null, 2)
        } catch(err) {
            console.log("No anda");
            return {status: "error", message:"No se pudieron borrar los elementos."}
        }
    }
}

module.exports = Contenedor;
