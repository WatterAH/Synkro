import { Request, Response } from "express";
import sucursalService from "../service/sucursalService";
import { Sucursal } from "../interfaces/Sucursal";
import { sendError, sendSuccess } from "../libs/responseHandler";

class SucursalController {

    async create(req: Request, res: Response) {
        try {
            const data: Sucursal = req.body;

            const sucursal = await sucursalService.create(data);

            if (!sucursal) {
                return sendError(res, "Error al crear sucursal", 500);
            }

            return sendSuccess(res, sucursal);
        } catch (error: any) {
            console.log(error);
            return sendError(res, error.message, 500);
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const sucursal = await sucursalService.getById(parseInt(id));

            if (!sucursal) {
                return sendError(res, "Sucursal no encontrada", 404);
            }

            return sendSuccess(res, sucursal);
        } catch (error: any) {
            return sendError(res, error.message, 500);
        }
    }

    async getAll(_req: Request, res: Response) {
        try {
            const sucursales = await sucursalService.getAll();
            return sendSuccess(res, sucursales);
        } catch (error: any) {
            return sendError(res, error.message, 500);
        }
    }

    async getByName(req: Request, res: Response) {
        try {
            const { name } = req.params;

            const sucursal = await sucursalService.getByName(name);

            if (!sucursal) {
                return sendError(res, "Sucursal no encontrada", 404);
            }

            return sendSuccess(res, sucursal);
        } catch (error: any) {
            return sendError(res, error.message, 500);
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data: Partial<Sucursal> = req.body;

            const sucursal = await sucursalService.update(parseInt(id), data);

            if (!sucursal) {
                return sendError(res, "Error al actualizar sucursal", 500);
            }

            return sendSuccess(res, sucursal);
        } catch (error: any) {
            return sendError(res, error.message, 500);
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const deleted = await sucursalService.delete(parseInt(id));

            if (!deleted) {
                return sendError(res, "Error al eliminar sucursal", 500);
            }

            return sendSuccess(res, { message: "Sucursal eliminada exitosamente" });
        } catch (error: any) {
            return sendError(res, error.message, 500);
        }
    }

}

export default new SucursalController();