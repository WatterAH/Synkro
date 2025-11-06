import { Request, Response } from "express";
import almacenService from "../service/almacenService";
import { Almacen } from "../interfaces/Almacen";
import { sendError, sendSuccess } from "../libs/responseHandler";

class AlmacenController {

    async create(req: Request, res: Response) {
        try {
            const data: Almacen = req.body;

            const almacen = await almacenService.create(data);

            if (!almacen) {
                return sendError(res, "Error al crear almacén", 500);
            }

            return sendSuccess(res, almacen);
        } catch (error: any) {
            console.log(error);
            return sendError(res, error.message, 500);
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const almacen = await almacenService.getById(id);

            if (!almacen) {
                return sendError(res, "Almacén no encontrado", 404);
            }

            return sendSuccess(res, almacen);
        } catch (error: any) {
            return sendError(res, error.message, 500);
        }
    }

    async getAll(_req: Request, res: Response) {
        try {
            const almacenes = await almacenService.getAll();
            return sendSuccess(res, almacenes);
        } catch (error: any) {
            return sendError(res, error.message, 500);
        }
    }

   

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data: Partial<Almacen> = req.body;

            const almacen = await almacenService.update(id, data);

            if (!almacen) {
                return sendError(res, "Error al actualizar almacén", 500);
            }

            return sendSuccess(res, almacen);
        } catch (error: any) {
            return sendError(res, error.message, 500);
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const deleted = await almacenService.delete(id);

            if (!deleted) {
                return sendError(res, "Error al eliminar almacén", 500);
            }

            return sendSuccess(res, { message: "Almacén eliminado exitosamente" });
        } catch (error: any) {
            return sendError(res, error.message, 500);
        }
    }

}

export default new AlmacenController();