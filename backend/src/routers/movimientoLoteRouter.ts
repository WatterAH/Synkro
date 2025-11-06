import { Router } from "express";
import movimientoLoteController from "../controllers/movimientoLoteController";

const movimientoLoteRouter = Router();

// Create
movimientoLoteRouter.post("/", movimientoLoteController.create);
movimientoLoteRouter.post("/registrar", movimientoLoteController.registrarMovimiento);

// Read
movimientoLoteRouter.get("/", movimientoLoteController.getAll);
movimientoLoteRouter.get("/ultimos", movimientoLoteController.getUltimosMovimientos);
movimientoLoteRouter.get("/:id", movimientoLoteController.getById);
movimientoLoteRouter.get("/tipo/:tipo_movimiento", movimientoLoteController.getByTipoMovimiento);
movimientoLoteRouter.get("/usuario/:usuario_id", movimientoLoteController.getByUsuarioId);

// Update
movimientoLoteRouter.patch("/:id", movimientoLoteController.update);

// Delete
movimientoLoteRouter.delete("/:id", movimientoLoteController.delete);

export default movimientoLoteRouter;