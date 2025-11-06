import { Router } from "express";
import varianteController from "../controllers/varianteController";

const varianteRouter = Router();

// Create
varianteRouter.post("/", varianteController.create);

// Read
varianteRouter.get("/:id", varianteController.getAll);
varianteRouter.get("/product/:product_id", varianteController.getByProductId);
varianteRouter.get("/sku/:sku", varianteController.getBySku);
varianteRouter.get("/barcode/:barcode", varianteController.getByBarcode);

// Update
varianteRouter.patch("/:id", varianteController.update);

// Delete
varianteRouter.delete("/:id", varianteController.delete);

export default varianteRouter;