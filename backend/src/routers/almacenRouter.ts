import { Router } from "express";
import almacenController from "../controllers/almacenController";

const almacenRouter = Router();

// Create
almacenRouter.post("/", almacenController.create);

// Read
almacenRouter.get("/", almacenController.getAll);
almacenRouter.get("/:id", almacenController.getById);

// Update
almacenRouter.patch("/:id", almacenController.update);

// Delete
almacenRouter.delete("/:id", almacenController.delete);

export default almacenRouter;