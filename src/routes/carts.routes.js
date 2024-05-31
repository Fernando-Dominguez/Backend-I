import { Router } from "express";
import CartManager from "../manager/cartsManager.js";

const cartManager = new CartManager("./src/data/carts.json");

const router = Router();

router.post("/", (req, res) => { });

router.get("/:cid", (req, res) => { });

router.post("/:id/product/:productId", (req, res) => { });

export default router;