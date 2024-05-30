import express from "express";
import cartRoutes from "./routes/products.routes.js";
import productsRoutes from "./routes/carts.routes.js";

const app = express();

const PORT = 8080;

// Configuracion de express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/carts", cartRoutes);
app.use("/api/products", productsRoutes);

app.listen(PORT, ()=>{
    console.log(`Server running on port http://localhost:${PORT}`);
});



