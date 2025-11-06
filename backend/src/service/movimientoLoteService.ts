import { MovimientoLote } from "../interfaces/MovimientoLote";
import { supabase } from "../middlewares/connection";

class MovimientoLoteService {

  async create(movimiento: MovimientoLote): Promise<MovimientoLote | null> {
    const { data, error } = await supabase
      .from("movimientos_lotes")
      .insert([movimiento])
      .select('*')
      .single();

    return error ? null : data;
  }

  async delete(id: string): Promise<boolean> {
    const { error } = await supabase
      .from("movimientos_lotes")
      .delete()
      .eq("id", id);

    return !error;
  }

  async getById(id: string): Promise<MovimientoLote | null> {
    const { data, error } = await supabase
      .from("movimientos_lotes")
      .select("*")
      .eq("id", id)
      .single();

    return error ? null : data;
  }

  async update(id: string, movimiento: Partial<MovimientoLote>): Promise<MovimientoLote | null> {
    const { data, error } = await supabase
      .from("movimientos_lotes")
      .update(movimiento)
      .eq("id", id)
      .select("*")
      .single();

    return error ? null : data;
  }

  async getAll(): Promise<MovimientoLote[]> {
    const { data, error } = await supabase
      .from("movimientos_lotes")
      .select("*")
      .order('created_at', { ascending: false });

    return error ? [] : data;
  }


  async getByTipoMovimiento(tipo_movimiento: string): Promise<MovimientoLote[]> {
    const { data, error } = await supabase
      .from("movimientos_lotes")
      .select("*")
      .eq("tipo_movimiento", tipo_movimiento)
      .order('created_at', { ascending: false });

    return error ? [] : data;
  }

  async getByUsuarioId(usuario_id: string): Promise<MovimientoLote[]> {
    const { data, error } = await supabase
      .from("movimientos_lotes")
      .select("*")
      .eq("usuario_id", usuario_id)
      .order('created_at', { ascending: false });

    return error ? [] : data;
  }


  async getUltimosMovimientos(limit: number = 50): Promise<MovimientoLote[]> {
    const { data, error } = await supabase
      .from("movimientos_lotes")
      .select("*")
      .order('created_at', { ascending: false })
      .limit(limit);

    return error ? [] : data;
  }

  // Método para registrar un movimiento automáticamente
  async registrarMovimiento(
    tipo_movimiento: string,
    usuario_id?: string,
    nota?: string
  ): Promise<MovimientoLote | null> {
    const movimiento: MovimientoLote = {
      tipo_movimiento,
      usuario_id: usuario_id || null,
      nota: nota || null
    };

    return await this.create(movimiento);
  }

}

export default new MovimientoLoteService();