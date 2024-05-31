import { productManager } from "./productManager.js";
import fs from "fs";

const manager = new ProductManager("../data/products.json/");

class Cart {
    constructor(id) {
        this.id = id;
        this.products = [];
    }
}

class CartManager {
    constructor(path) {
        this.path = path;
        if (fs.existsSync(this.path)) {
            try {
                this.carts = JSON.parse(fs.readFileSync(this.path, "utf-8"));
            } catch (error) {
                this.carts = [];
            }
        } else {
            this.carts = [];
        }
    }
    async createrCart() {
        const newId =
            this.carts.length > 0
                ? this.carts[this.carts.length - 1].id + 1
                : 1;

        const newCart = new Cart(newId);

        this.carts.push(newCart);

        try {
            await fs.promises.writeFile(
                this.path,
                JSON.stringify(this.carts, null, "\t")
            );

            console.log("El carrito se creó correctamente");
        } catch (error) {
            throw new Error(error);
        }
    }

    async getCart(idCart) {
        if (isNaN(+idCart)) {
            console.log("El id no es un número");
            throw new Error("El id no es un número");
        }
        const cart = this.carts.find((cart) => cart.id === +idCart);
        if (!cart) {
            throw new Error("El carrito no se encontro");
        }
        return cart;
    }





    async addProdToCart(idCart, idProd) {
        const cart = await this.getCart(idCart);
        if (!cart) {
            throw new Error("El carrito no se encontro");
        }

        const product = await productManager.getProductById(idProd);

        if (!product) {
            throw new Error("El producto no se encontro");
        }

        const prodInCart = cart.products.find(
            (product) => product.idProduct === idProd
        );

        if (prodInCart) {
            console.log("El producto ya existe en el carrito");
            cart.products.forEach((product) => {
                if (product.idProduct === idProd) {
                    product.quantity += 1;
                }
            });
        } else {
            cart.products.push({ idProduct: idProd, quantity: 1 });
        }
        try {
            await fs.promises.writeFile(
                this.path,
                JSON.stringify(this.carts, null, "\t")
            );
            console.log("El producto fue agregado correctamente");
        } catch (error) {
            throw new Error(error);
        }
    }

}
export default CartManager;
