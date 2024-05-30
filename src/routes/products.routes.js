
import { Router } from "express";
import Product from "../manager/productManager.js";
import ProductManager from "../manager/productManager.js";

const manager = new ProductManager("./src/data/products.json");

const router = Router();

router.get("/", (req, res) => {
    res.json(manager.getProducts());
});

router.get('/:pid', (req, res) => {
    const { pid } = req.params;
    res.json(manager.getProductById(pid));
})

export default router;