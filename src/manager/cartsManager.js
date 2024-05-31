import fs from "fs";
class Cart {
    constructor(cartId) {
        this.cartId = cartId;
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
    createCart() { }

    getCart() { }

    addProductToCart() { }

}
export default CartManager;
