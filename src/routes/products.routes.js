
import { Router } from "express";
import Product from "../manager/productManager.js";
import ProductManager from "../manager/productManager.js";

const manager = new ProductManager("./src/data/products.json");

const router = Router();

// Get Products
router.get("/", (req, res) => {
    res.json(manager.getProducts());
});

// Get Product by ID
router.get('/:pid', (req, res) => {
    const { pid } = req.params;
    res.json(manager.getProductById(pid));
})

// Add Product
router.post('/', (req, res) => {
    const { title, description, code, price, stock, category, thumbnails } = req.body;

    if (!title || !description || !code || !price || !stock || !category || !thumbnails) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' })
    }

    const newProduct = {
        title,
        description,
        code,
        price,
        stock,
        category,
        thumbnails
    }

    res.json(manager.addProduct(newProduct));

})

router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { title, description, price, thumbnail, code, stock, category, status } =
        req.body;

    const product = manager.getProductById(id);

    if (!product) {
        return res.status(404).json({
            error: "No se encontro el producto",
        });
    }

    manager.updateProduct(product.id, {
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        status,
        category
    });

    const newProduct = manager.getProductById(Number(id));

    res.json(newProduct);

    return res.status(400).json({
        error: `No se pudo actualizar el producto: ${error.message}`,
    });

});

export default router;