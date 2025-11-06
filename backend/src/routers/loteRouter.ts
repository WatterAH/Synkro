import { Router } from "express";
import loteController from "../controllers/loteController";

const loteRouter = Router();

// Create
loteRouter.post("/", loteController.create);

// Read
loteRouter.get("/", loteController.getAll);
loteRouter.get("/relaciones", loteController.getLotesConRelaciones);
loteRouter.get("/proximos-vencer", loteController.getLotesProximosAVencer);
loteRouter.get("/:id", loteController.getById);
loteRouter.get("/variante/:variante_id", loteController.getByVarianteId);
loteRouter.get("/estado/:estado", loteController.getByEstado);
loteRouter.get("/proveedor/:proveedor", loteController.getByProveedor);

// Update
loteRouter.patch("/:id", loteController.update);
loteRouter.patch("/:id/estado", loteController.cambiarEstado);

// Delete
loteRouter.delete("/:id", loteController.delete);

export default loteRouter;