import { Lote } from "../interfaces/Lote";
import { supabase } from "../middlewares/connection";

class LoteService {

  async create(lote: Lote): Promise<Lote | null> {
    const { data, error } = await supabase
      .from("lotes")
      .insert([lote])
      .select('*')
      .single();

    return error ? null : data;
  }

  async delete(id: string): Promise<boolean> {
    const { error } = await supabase
      .from("lotes")
      .delete()
      .eq("id", id);

    return !error;
  }

  async getById(id: string): Promise<Lote | null> {
    const { data, error } = await supabase
      .from("lotes")
      .select("*")
      .eq("id", id)
      .single();

    return error ? null : data;
  }

  async update(id: string, lote: Partial<Lote>): Promise<Lote | null> {
    const { data, error } = await supabase
      .from("lotes")
      .update(lote)
      .eq("id", id)
      .select("*")
      .single();

    return error ? null : data;
  }

  async getAll(): Promise<Lote[]> {
    const { data, error } = await supabase
      .from("lotes")
      .select("*")
      .order('fecha_entrada', { ascending: false });

    return error ? [] : data;
  }

  async getByVarianteId(variante_id: string): Promise<Lote[]> {
    const { data, error } = await supabase
      .from("lotes")
      .select("*")
      .eq("variante_id", variante_id)
      .order('fecha_entrada', { ascending: false });

    return error ? [] : data;
  }

  async getByNumeroLote(numero_lote: string): Promise<Lote | null> {
    const { data, error } = await supabase
      .from("lotes")
      .select("*")
      .eq("numero_lote", numero_lote)
      .single();

    return error ? null : data;
  }

  async getByEstado(estado: string): Promise<Lote[]> {
    const { data, error } = await supabase
      .from("lotes")
      .select("*")
      .eq("estado", estado)
      .order('fecha_entrada', { ascending: false });

    return error ? [] : data;
  }

  async getByProveedor(proveedor: string): Promise<Lote[]> {
    const { data, error } = await supabase
      .from("lotes")
      .select("*")
      .eq("proveedor", proveedor)
      .order('fecha_entrada', { ascending: false });

    return error ? [] : data;
  }

  async getLotesProximosAVencer(dias: number = 30): Promise<Lote[]> {
    const fechaLimite = new Date();
    fechaLimite.setDate(fechaLimite.getDate() + dias);

    const { data, error } = await supabase
      .from("lotes")
      .select("*")
      .not('fecha_vencimiento', 'is', null)
      .lte('fecha_vencimiento', fechaLimite.toISOString())
      .eq('estado', 'activo')
      .order('fecha_vencimiento', { ascending: true });

    return error ? [] : data;
  }

  async getLotesVencidos(): Promise<Lote[]> {
    const fechaActual = new Date().toISOString();

    const { data, error } = await supabase
      .from("lotes")
      .select("*")
      .not('fecha_vencimiento', 'is', null)
      .lt('fecha_vencimiento', fechaActual)
      .eq('estado', 'activo')
      .order('fecha_vencimiento', { ascending: true });

    return error ? [] : data;
  }

  async getLotesConRelaciones(): Promise<any[]> {
    const { data, error } = await supabase
      .from("lotes")
      .select(`
        *,
        variantes (
          *,
          productos (*)
        )
      `)
      .order('fecha_entrada', { ascending: false });

    return error ? [] : data;
  }

  async cambiarEstado(id: string, nuevoEstado: string): Promise<Lote | null> {
    const { data, error } = await supabase
      .from("lotes")
      .update({ estado: nuevoEstado })
      .eq("id", id)
      .select("*")
      .single();

    return error ? null : data;
  }

}

export default new LoteService();