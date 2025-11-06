import { Request, Response } from "express";
import inventarioService from "../service/inventarioService";
import { Inventario } from "../interfaces/Inventario";
import { sendError, sendSuccess } from "../libs/responseHandler";

class InventarioController {
  async create(req: Request, res: Response) {
    try {
      const data: Inventario = req.body;

      const inventario = await inventarioService.create(data);

      if (!inventario) {
        return sendError(res, "Error al crear inventario", 500);
      }

      return sendSuccess(res, inventario);
    } catch (error: any) {
      return sendError(res, error.message, 500);
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const inventario = await inventarioService.getById(id);

      if (!inventario) {
        return sendError(res, "Inventario no encontrado", 404);
      }

      return sendSuccess(res, inventario);
    } catch (error: any) {
      return sendError(res, error.message, 500);
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if ((id as string) == "null") {
        const inventarios = await inventarioService.getAll();
        return sendSuccess(res, inventarios);
      } else {
        const inventarios = await inventarioService.getAllBySucursal(id);
        return sendSuccess(res, inventarios);
      }
    } catch (error: any) {
      return sendError(res, error.message, 500);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data: Partial<Inventario> = req.body;

      const inventario = await inventarioService.update(id, data);

      if (!inventario) {
        return sendError(res, "Error al actualizar inventario", 500);
      }

      return sendSuccess(res, inventario);
    } catch (error: any) {
      return sendError(res, error.message, 500);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const deleted = await inventarioService.delete(id);

      if (!deleted) {
        return sendError(res, "Error al eliminar inventario", 500);
      }

      return sendSuccess(res, { message: "Inventario eliminado exitosamente" });
    } catch (error: any) {
      return sendError(res, error.message, 500);
    }
  }
}

export default new InventarioController();
