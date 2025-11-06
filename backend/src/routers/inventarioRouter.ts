import { Router } from "express";
import inventarioController from "../controllers/inventarioController";

const inventarioRouter = Router();
// Create
inventarioRouter.post("/", inventarioController.create);
// Read
inventarioRouter.get("/all/:id", inventarioController.getAll);
inventarioRouter.get("/:id", inventarioController.getById);
// Update
inventarioRouter.patch("/:id", inventarioController.update);
// Delete
inventarioRouter.delete("/:id", inventarioController.delete);

export default inventarioRouter;