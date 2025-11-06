import { Router } from "express";
import productoController from "../controllers/productoController";

const productoRouter = Router();

// Create
productoRouter.post("/", productoController.create);

// Read
productoRouter.get("/", productoController.getAll);
productoRouter.get("/:id", productoController.getById);
productoRouter.get("/sku/:sku_base", productoController.getBySkuBase);
productoRouter.get("/category/:category", productoController.getByCategory);
productoRouter.get("/search/:name", productoController.searchByName);

// Update
productoRouter.patch("/:id", productoController.update);

// Delete
productoRouter.delete("/:id", productoController.delete);

export default productoRouter;