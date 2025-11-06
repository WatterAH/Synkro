import { Lote } from "../interfaces/Lote";
import { supabase } from "../middlewares/connection";

class LoteService {

  async create(lote: Partial<Lote>): Promise<Lote | null> {
    const { data, error } = await supabase
      .from("lotes")
      .insert([lote])
      .select('*')
      .single();
    console.log(error)
    return error ? null : data;
  }

  async delete(num: string): Promise<boolean> {
    const { error } = await supabase
      .from("lotes")
      .delete()
      .eq("num", num);

    return !error;
  }

  async getBynum(num: string): Promise<Lote | null> {
    const { data, error } = await supabase
      .from("lotes")
      .select("*")
      .eq("num", num)
      .single();

    return error ? null : data;
  }

  async update(num: string, lote: Partial<Lote>): Promise<Lote | null> {
    const { data, error } = await supabase
      .from("lotes")
      .update(lote)
      .eq("num", num)
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

  async getByVariantenum(variante_num: string): Promise<Lote[]> {
    const { data, error } = await supabase
      .from("lotes")
      .select("*")
      .eq("variante_num", variante_num)
      .order('create_at', { ascending: false })
      .limit(1).single();

    return error ? [] : data;
  }

  async getByNumeroLote(): Promise<Lote | null> {
    const { data, error } = await supabase
      .from("lotes")
      .select("*")
      .order('num', { ascending: false })
      .limit(1)
      .single();

    console.log(error)

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

  async getLotesVencnumos(): Promise<Lote[]> {
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

  async cambiarEstado(num: string, nuevoEstado: string): Promise<Lote | null> {
    const { data, error } = await supabase
      .from("lotes")
      .update({ estado: nuevoEstado })
      .eq("num", num)
      .select("*")
      .single();

    return error ? null : data;
  }

}

export default new LoteService();