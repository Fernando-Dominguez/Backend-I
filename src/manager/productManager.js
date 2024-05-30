import fs from "fs";
import path from "path";


// Class Product
 class Product {
    constructor(title, description, price, thumbnails, category, status = true, code, stock) {
            this.title = title,
            this.description = description,
            this.code = code,
            this.price = price,
            this.status = status,
            this.stock = stock,
            this.category = category,
            this.thumbnails = thumbnails
    }
}
// Class ProductManager
 class ProductManager {
    constructor(path) {
        this.path = path;

        // Validamos si existe el archivo
        if (fs.existsSync(this.path)) {
            try {
                this.products = JSON.parse(fs.readFileSync(this.path, "utf-8"));
            } catch (error) {
                this.products = [];
            }
        } else {
            this.products = [];
        }
    }



    async addProduct(product) {
        // Valida que todos los campos contengan datos
        if (
            !product.title ||
            !product.description ||
            !product.price ||
            !product.code ||
            !product.stock ||
            !product.category ||
            !product.thumbnail
        ) {
            console.log("Son obligatorios todos los campos");
            return;
        }

        // Valida que el código no exista en el array
        if (this.products.some((p) => p.code === product.code)) {
            console.log("El código ya existe");
            return;
        }

        // Valida que el array no este vacio
        if (this.products.length > 0) {
            // Si no esta vacio, se suma 1 para el nuevo id
            const newId = this.products[this.products.length - 1].id + 1;
            product.id = newId;
        } else {
            // Si esta vacio empiezo con el id 1
            product.id = 1;
        }

        this.products.push(product);

        try {
            await fs.promises.writeFile(
                this.path,
                JSON.stringify(this.products, null, "\t")
            );

            console.log("El producto fue creado correctamente");
        } catch (error) {
            console.log(error);
        }
    }

    getProducts() {
        // Devolvemos el array de productos
        return this.products;
    }

    getProductById(idProduct) {
        if (isNaN(Number(idProduct))) {
            console.log("El id debe ser un número");
            return;
        }

        // Buscamos el producto por su id
        const product = this.products.find(
            (product) => product.id === Number(idProduct)
        );

        if (!product) {
            return "No se encontro el producto";
        }

        return product;
    }

    deleteProduct(idProduct) {
        // Obtenemos el indice del producto
        const productIndex = this.products.findIndex(
            (product) => product.id === idProduct
        );

        if (productIndex === -1) {
            console.log("No se encontro el producto");
            return;
        }

        // Eliminamos el producto
        this.products.splice(productIndex, 1);

        try {
            fs.promises.writeFile(
                this.path,
                JSON.stringify(this.products, null, "\t")
            );

            console.log("Se elimino el producto correctamente");
        } catch (error) {
            console.log(error);
        }
    }

    updateProduct(idProduct, product) {
        // Obtenemos el indice del producto
        const productIndex = this.products.findIndex(
            (product) => product.id === idProduct
        );

        const productOld = this.products[productIndex];

        if (productIndex === -1) {
            console.log("No se encontro el producto");
            return;
        }

        // Actualizamos el producto
        // Si algun campo coincide con productOld, lo sobreescribimos
        this.products[productIndex] = {
            ...productOld,
            ...product,
        };

        try {
            fs.promises.writeFile(
                this.path,
                JSON.stringify(this.products, null, "\t")
            );

            console.log("Se actualizo el producto correctamente");
        } catch (error) {
            console.log(error);
        }
    }
}

// module.exports = new ProductManager("./data/products.json");
// export default new ProductManager("./data/products.json");
export default ProductManager;
// Pruebas
// const manager = new ProductManager("./data/products.json");

// Add Product ✅
// manager.addProduct(
//   new Product("Product 1", "Description 1", 100, "image 1", "0001A", 10)
// );
// manager.addProduct(
//   new Product("Product 2", "Description 2", 200, "image 2", "0002B", 20)
// );
// manager.addProduct(
//   new Product("Product 3", "Description 3", 300, "image 3", "0003C", 30)
// );
// manager.addProduct(
//   new Product("Product 4", "Description 4", 400, "image 4", "0004D", 40)
// );

// Get Products ✅
// console.log(manager.getProducts());

// Get Product By Id ✅
// console.log(manager.getProductById(50));

// Delete Product ✅
// manager.deleteProduct(3);

// Update Product ✅
// manager.updateProduct(1, {
//   title: "Product 1 Updated",
// });