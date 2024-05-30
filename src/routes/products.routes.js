
import { Router } from "express";
import Product from "../manager/productManager.js";
import ProductManager from "../manager/productManager.js";
import fs from 'fs'
import path from "path";


const manager = new ProductManager("./data/products.json");

const router = Router();

const products =[]

router.get("/", (req, res) => {
    res.json(products);
});

router.post("/", (req, res) => {
    
    const { title, description, code, price, status = true, stock, category, thumbnails } = req.body;
    console.log(title)
    const newId = products.length + 1;

    if (!title || !description || !code || !price || !stock || !category || !thumbnails) {
        return res.status(400).json({
            error: "Todos los datos son requeridos"
        });
    }

    let product = new Product(res.body);

    manager.addProduct(product);
    console.log(product)
    console.log(products);
    res.status(201).json(product);

});


export default router;