import { Variante } from "../interfaces/Variante";
import { supabase } from "../middlewares/connection";

class VarianteService {
  async create(variante: Variante): Promise<Partial<Variante> | null> {
    const { data, error } = await supabase
      .from("variantes")
      .insert([variante])
      .select("*")
      .single();

    return error ? null : data;
  }

  async delete(id: string): Promise<boolean> {
    const { error } = await supabase.from("variantes").delete().eq("id", id);

    return !error;
  }

  async getProducts(
    sucursalId: string,
    searchTerm?: string,
    category?: string,
    color?: string
  ): Promise<Variante[] | null> {
    let query = supabase.from("variantes").select("*, product:productos(*)");

    if (sucursalId !== "all") {
      query = query.eq("sucursal_id", sucursalId);
    }
    if (category != "all") {
      query = query.eq("tipo", category);
    }
    if (color != "all") {
      query = query.eq("color", color);
    }
    if (searchTerm) {
      query = query.or(
        `sku.ilike.%${searchTerm}%,barcode.ilike.%${searchTerm}%`
      );
    }

    const { data, error } = await query;

    return error ? null : data;
  }

  async getBySucursalId(id: string): Promise<Variante[] | null> {
    const { data, error } = await supabase
      .from("variantes")
      .select("*, productos(*)")
      .eq("sucursal_id", id);

    return error ? null : data;
  }

  async update(
    id: string,
    variante: Partial<Variante>
  ): Promise<Variante | null> {
    const { data, error } = await supabase
      .from("variantes")
      .update(variante)
      .eq("id", id)
      .select("*")
      .single();

    return error ? null : data;
  }

  async getAll(): Promise<Variante[]> {
    const { data, error } = await supabase
      .from("variantes")
      .select("*, producto:productos(*)");

    return error ? [] : data;
  }

  async getByProductId(product_id: string): Promise<Variante[]> {
    const { data, error } = await supabase
      .from("variantes")
      .select("*")
      .eq("product_id", product_id);

    return error ? [] : data;
  }

  async getBySku(sku: string): Promise<Variante | null> {
    const { data, error } = await supabase
      .from("variantes")
      .select("*")
      .eq("sku", sku)
      .single();

    return error ? null : data;
  }

  async getByBarcode(barcode: string): Promise<Variante | null> {
    const { data, error } = await supabase
      .from("variantes")
      .select("*")
      .eq("barcode", barcode)
      .single();

    return error ? null : data;
  }
}

export default new VarianteService();
