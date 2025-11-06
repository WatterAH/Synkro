import { Request, Response } from "express";
import productoService from "../service/productoService";
import { Producto } from "../interfaces/Productos";
import { sendError, sendSuccess } from "../libs/responseHandler";

class ProductoController {
  async create(req: Request, res: Response) {
    try {
      const data: Producto = req.body;

      const producto = await productoService.create(data);

      if (!producto) {
        return sendError(res, "Error al crear producto", 500);
      }

      return sendSuccess(res, producto);
    } catch (error: any) {
      return sendError(res, error.message, 500);
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const producto = await productoService.getById(id);

      if (!producto) {
        return sendError(res, "Producto no encontrado", 404);
      }

      return sendSuccess(res, producto);
    } catch (error: any) {
      return sendError(res, error.message, 500);
    }
  }

  async getAll(_req: Request, res: Response) {
    try {
      const productos = await productoService.getAll();
      return sendSuccess(res, productos);
    } catch (error: any) {
      return sendError(res, error.message, 500);
    }
  }

  async getBySkuBase(req: Request, res: Response) {
    try {
      const { sku_base } = req.params;

      const producto = await productoService.getBySkuBase(sku_base);

      if (!producto) {
        return sendError(res, "Producto no encontrado", 404);
      }

      return sendSuccess(res, producto);
    } catch (error: any) {
      return sendError(res, error.message, 500);
    }
  }

  async getByCategory(req: Request, res: Response) {
    try {
      const { category } = req.params;

      const productos = await productoService.getByCategory(category);
      return sendSuccess(res, productos);
    } catch (error: any) {
      return sendError(res, error.message, 500);
    }
  }

  async searchByName(req: Request, res: Response) {
    try {
      const { name } = req.params;

      const productos = await productoService.searchByName(name);
      return sendSuccess(res, productos);
    } catch (error: any) {
      return sendError(res, error.message, 500);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data: Partial<Producto> = req.body;

      const producto = await productoService.update(id, data);

      if (!producto) {
        return sendError(res, "Error al actualizar producto", 500);
      }

      return sendSuccess(res, producto);
    } catch (error: any) {
      return sendError(res, error.message, 500);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const deleted = await productoService.delete(id);

      if (!deleted) {
        return sendError(res, "Error al eliminar producto", 500);
      }

      return sendSuccess(res, { message: "Producto eliminado exitosamente" });
    } catch (error: any) {
      return sendError(res, error.message, 500);
    }
  }
}

export default new ProductoController();
