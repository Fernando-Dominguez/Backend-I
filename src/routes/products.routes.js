
import { Router } from "express";
import Product from "../manager/productManager.js";
import ProductManager from "../manager/productManager.js";



const manager = new ProductManager("./data/products.json");

const router = Router();

const products =[]

router.get("/", (req, res) => {
    res.json(products);
});

router.post("/", (req, res) => {
    const { title, description, code, price, status = true, stock, category, thumbnails } = req.body;
    const newId = products.length + 1;

    if (!title || !description || !code || !price || !stock || !category || !thumbnails) {
        return res.status(400).json({
            error: "Todos los datos son requeridos"
        });
    }


    let product = new Product(newId, title, description, code, price, status, stock, category, thumbnails);

    manager.addProduct(product);


    res.status(201).json(product);
});

export default router;