import { Router } from "express";

const router = Router();

const carts = [];

router.get("/", (req, res) => {
    res.json(carts);
});

router.post("/", (req, res) => {
    const { id, quantity } = req.body;

    if(!id || !quantity) {
        return res.status(400).json({
            error: "name and age are required"
        });
    }

    carts.push({
        id,
        quantity
    });

    res.status(201).json({
        post:{
            id,
            quantity
        }        
    }); 
});

export default router;