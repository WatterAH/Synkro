import { Request, Response } from "express";
import varianteService from "../service/varianteService";
import { Variante } from "../interfaces/Variante";
import { sendError, sendSuccess } from "../libs/responseHandler";
import loteService from "../service/loteService";

class VarianteController {
  async create(req: Request, res: Response) {
    try {
      const data: Variante = req.body;

      const lote = await loteService.getByNumeroLote();
      let numlote = lote ? lote.num + 1 : 1;

      const sku = `${data.tipo}${data.variante}-L${numlote}${data.color}${data.talla}`;

      const inserdata = {
        product_id: data.product_id,
        sku,
        talla: data.talla,
        barcode: data.barcode,
        color: data.color,
        sucursal_id: data.sucursal_id,
        tipo: data.tipo,
        cantidad: 180,
      };

      const variante = await varianteService.create(inserdata);

      if (!variante) {
        return sendError(res, "Error al crear variante", 500);
      }

      await loteService.create({
        variante_id: variante.id,
        precio_compra: 72000 as number,
        estado: "Excelente",
      });

      return sendSuccess(res, true);
    } catch (error: any) {
      return sendError(res, error.message, 500);
    }
  }

  async getSummary(_req: Request, res: Response) {
    try {
      const summary = await varianteService.getSummary();

      if (!summary) {
        return sendError(res, "Error al obtener resumen", 500);
      }
      return sendSuccess(res, summary);
    } catch (error) {
      return sendError(res, "Error al obtener resumen", 500);
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const search = req.query.search as string | undefined;
      const category = req.query.category as string | undefined;
      const color = req.query.color as string | undefined;

      const products = await varianteService.getProducts(
        id == "null" ? "all" : id,
        search,
        category,
        color
      );

      if (!products) {
        return sendError(res, "Error al obtener productos", 500);
      }

      return sendSuccess(res, products);
    } catch (error: any) {
      return sendError(res, error.message, 500);
    }
  }

  async getByProductId(req: Request, res: Response) {
    try {
      const { product_id } = req.params;

      const variantes = await varianteService.getByProductId(product_id);
      return sendSuccess(res, variantes);
    } catch (error: any) {
      return sendError(res, error.message, 500);
    }
  }

  async getBySku(req: Request, res: Response) {
    try {
      const { sku } = req.params;

      const variante = await varianteService.getBySku(sku);

      if (!variante) {
        return sendError(res, "Variante no encontrada", 404);
      }

      return sendSuccess(res, variante);
    } catch (error: any) {
      return sendError(res, error.message, 500);
    }
  }

  async getByBarcode(req: Request, res: Response) {
    try {
      const { barcode } = req.params;

      const variante = await varianteService.getByBarcode(barcode);

      if (!variante) {
        return sendError(res, "Variante no encontrada", 404);
      }

      return sendSuccess(res, variante);
    } catch (error: any) {
      return sendError(res, error.message, 500);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data: Partial<Variante> = req.body;

      const variante = await varianteService.update(id, data);

      if (!variante) {
        return sendError(res, "Error al actualizar variante", 500);
      }

      return sendSuccess(res, variante);
    } catch (error: any) {
      return sendError(res, error.message, 500);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const deleted = await varianteService.delete(id);

      if (!deleted) {
        return sendError(res, "Error al eliminar variante", 500);
      }

      return sendSuccess(res, { message: "Variante eliminada exitosamente" });
    } catch (error: any) {
      return sendError(res, error.message, 500);
    }
  }
}

export default new VarianteController();
