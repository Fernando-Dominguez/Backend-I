import fs from "fs";
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

    addProductToCart() { }

}
export default CartManager;
