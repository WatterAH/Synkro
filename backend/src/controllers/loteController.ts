import { Request, Response } from "express";
import loteService from "../service/loteService";
import { Lote } from "../interfaces/Lote";
import { sendError, sendSuccess } from "../libs/responseHandler";

class LoteController {
  async create(req: Request, res: Response) {
    try {
      const data: Lote = req.body;

      const lote = await loteService.create(data);

      if (!lote) {
        return sendError(res, "Error al crear lote", 500);
      }

      return sendSuccess(res, lote);
    } catch (error: any) {
      return sendError(res, error.message, 500);
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const lote = await loteService.getBynum(id);

      if (!lote) {
        return sendError(res, "Lote no encontrado", 404);
      }

      return sendSuccess(res, lote);
    } catch (error: any) {
      return sendError(res, error.message, 500);
    }
  }

  async getAll(_req: Request, res: Response) {
    try {
      const lotes = await loteService.getAll();
      return sendSuccess(res, lotes);
    } catch (error: any) {
      return sendError(res, error.message, 500);
    }
  }

  async getByVarianteId(req: Request, res: Response) {
    try {
      const { variante_id } = req.params;

      const lotes = await loteService.getByVariantenum(variante_id);
      return sendSuccess(res, lotes);
    } catch (error: any) {
      return sendError(res, error.message, 500);
    }
  }

  async getByEstado(req: Request, res: Response) {
    try {
      const { estado } = req.params;

      const lotes = await loteService.getByEstado(estado);
      return sendSuccess(res, lotes);
    } catch (error: any) {
      return sendError(res, error.message, 500);
    }
  }

  async getByProveedor(req: Request, res: Response) {
    try {
      const { proveedor } = req.params;

      const lotes = await loteService.getByProveedor(proveedor);
      return sendSuccess(res, lotes);
    } catch (error: any) {
      return sendError(res, error.message, 500);
    }
  }

  async getLotesProximosAVencer(req: Request, res: Response) {
    try {
      const { dias } = req.query;
      const diasNumero = dias ? parseInt(dias as string) : 30;

      const lotes = await loteService.getLotesProximosAVencer(diasNumero);
      return sendSuccess(res, lotes);
    } catch (error: any) {
      return sendError(res, error.message, 500);
    }
  }

  async getLotesConRelaciones(_req: Request, res: Response) {
    try {
      const lotes = await loteService.getLotesConRelaciones();
      return sendSuccess(res, lotes);
    } catch (error: any) {
      return sendError(res, error.message, 500);
    }
  }

  async cambiarEstado(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { estado } = req.body;

      if (!estado) {
        return sendError(res, "Se requiere el estado", 400);
      }

      const lote = await loteService.cambiarEstado(id, estado);

      if (!lote) {
        return sendError(res, "Error al cambiar estado del lote", 500);
      }

      return sendSuccess(res, lote);
    } catch (error: any) {
      return sendError(res, error.message, 500);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data: Partial<Lote> = req.body;

      const lote = await loteService.update(id, data);

      if (!lote) {
        return sendError(res, "Error al actualizar lote", 500);
      }

      return sendSuccess(res, lote);
    } catch (error: any) {
      return sendError(res, error.message, 500);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const deleted = await loteService.delete(id);

      if (!deleted) {
        return sendError(res, "Error al eliminar lote", 500);
      }

      return sendSuccess(res, { message: "Lote eliminado exitosamente" });
    } catch (error: any) {
      return sendError(res, error.message, 500);
    }
  }
}

export default new LoteController();
