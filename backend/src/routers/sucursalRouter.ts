import { Router } from "express";
import sucursalController from "../controllers/sucursalController";

const sucursalRouter = Router();

// Create
sucursalRouter.post("/", sucursalController.create);

// Read
sucursalRouter.get("/", sucursalController.getAll);
sucursalRouter.get("/:id", sucursalController.getById);
sucursalRouter.get("/name/:name", sucursalController.getByName);

// Update
sucursalRouter.patch("/:id", sucursalController.update);

// Delete
sucursalRouter.delete("/:id", sucursalController.delete);

export default sucursalRouter;