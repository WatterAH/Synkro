import { Request, Response } from "express";
import movimientoLoteService from "../service/movimientoLoteService";
import { MovimientoLote } from "../interfaces/MovimientoLote";
import { sendError, sendSuccess } from "../libs/responseHandler";

class MovimientoLoteController {

    async create(req: Request, res: Response) {
        try {
            const data: MovimientoLote = req.body;

            const movimiento = await movimientoLoteService.create(data);

            if (!movimiento) {
                return sendError(res, "Error al crear movimiento", 500);
            }

            return sendSuccess(res, movimiento);
        } catch (error: any) {
            console.log(error);
            return sendError(res, error.message, 500);
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const movimiento = await movimientoLoteService.getById(id);

            if (!movimiento) {
                return sendError(res, "Movimiento no encontrado", 404);
            }

            return sendSuccess(res, movimiento);
        } catch (error: any) {
            return sendError(res, error.message, 500);
        }
    }

    async getAll(_req: Request, res: Response) {
        try {
            const movimientos = await movimientoLoteService.getAll();
            return sendSuccess(res, movimientos);
        } catch (error: any) {
            return sendError(res, error.message, 500);
        }
    }


    async getByTipoMovimiento(req: Request, res: Response) {
        try {
            const { tipo_movimiento } = req.params;

            const movimientos = await movimientoLoteService.getByTipoMovimiento(tipo_movimiento);
            return sendSuccess(res, movimientos);
        } catch (error: any) {
            return sendError(res, error.message, 500);
        }
    }

    async getByUsuarioId(req: Request, res: Response) {
        try {
            const { usuario_id } = req.params;

            const movimientos = await movimientoLoteService.getByUsuarioId(usuario_id);
            return sendSuccess(res, movimientos);
        } catch (error: any) {
            return sendError(res, error.message, 500);
        }
    }






    async getUltimosMovimientos(req: Request, res: Response) {
        try {
            const { limit } = req.query;
            const limitNumero = limit ? parseInt(limit as string) : 50;

            const movimientos = await movimientoLoteService.getUltimosMovimientos(limitNumero);
            return sendSuccess(res, movimientos);
        } catch (error: any) {
            return sendError(res, error.message, 500);
        }
    }

 

    async registrarMovimiento(req: Request, res: Response) {
        try {
            const {
                lote_id,
                tipo_movimiento,
                cantidad,
                cantidad_anterior,
                usuario_id,
                referencia,
                nota
            } = req.body;

            if (!lote_id || !tipo_movimiento || !cantidad || cantidad_anterior === undefined) {
                return sendError(res, "Faltan campos requeridos", 400);
            }

            const movimiento = await movimientoLoteService.registrarMovimiento(
                lote_id,
                tipo_movimiento,
                nota
            );

            if (!movimiento) {
                return sendError(res, "Error al registrar movimiento", 500);
            }

            return sendSuccess(res, movimiento);
        } catch (error: any) {
            return sendError(res, error.message, 500);
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data: Partial<MovimientoLote> = req.body;

            const movimiento = await movimientoLoteService.update(id, data);

            if (!movimiento) {
                return sendError(res, "Error al actualizar movimiento", 500);
            }

            return sendSuccess(res, movimiento);
        } catch (error: any) {
            return sendError(res, error.message, 500);
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const deleted = await movimientoLoteService.delete(id);

            if (!deleted) {
                return sendError(res, "Error al eliminar movimiento", 500);
            }

            return sendSuccess(res, { message: "Movimiento eliminado exitosamente" });
        } catch (error: any) {
            return sendError(res, error.message, 500);
        }
    }

}

export default new MovimientoLoteController();