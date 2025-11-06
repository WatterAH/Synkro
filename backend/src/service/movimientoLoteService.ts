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

  async getByLoteId(lote_id: string): Promise<MovimientoLote[]> {
    const { data, error } = await supabase
      .from("movimientos_lotes")
      .select("*")
      .eq("lote_id", lote_id)
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

  async getByReferencia(referencia: string): Promise<MovimientoLote[]> {
    const { data, error } = await supabase
      .from("movimientos_lotes")
      .select("*")
      .eq("referencia", referencia)
      .order('created_at', { ascending: false });

    return error ? [] : data;
  }

  async getMovimientosConRelaciones(): Promise<any[]> {
    const { data, error } = await supabase
      .from("movimientos_lotes")
      .select(`
        *,
        lotes (
          *,
          variantes (
            *,
            productos (*)
          )
        )
      `)
      .order('created_at', { ascending: false });

    return error ? [] : data;
  }

  async getMovimientosPorFecha(fecha_inicio: string, fecha_fin: string): Promise<MovimientoLote[]> {
    const { data, error } = await supabase
      .from("movimientos_lotes")
      .select("*")
      .gte('created_at', fecha_inicio)
      .lte('created_at', fecha_fin)
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

  async getEstadisticasPorTipo(): Promise<any[]> {
    const { data, error } = await supabase
      .from("movimientos_lotes")
      .select("tipo_movimiento, cantidad");

    if (error) return [];

    // Agrupar por tipo de movimiento
    const stats = data.reduce((acc: any, mov: any) => {
      if (!acc[mov.tipo_movimiento]) {
        acc[mov.tipo_movimiento] = {
          tipo: mov.tipo_movimiento,
          total_movimientos: 0,
          total_cantidad: 0
        };
      }
      acc[mov.tipo_movimiento].total_movimientos++;
      acc[mov.tipo_movimiento].total_cantidad += mov.cantidad;
      return acc;
    }, {});

    return Object.values(stats);
  }

  // Método para registrar un movimiento automáticamente
  async registrarMovimiento(
    lote_id: string,
    tipo_movimiento: string,
    cantidad: number,
    cantidad_anterior: number,
    usuario_id?: string,
    referencia?: string,
    nota?: string
  ): Promise<MovimientoLote | null> {
    const movimiento: MovimientoLote = {
      lote_id,
      tipo_movimiento,
      cantidad,
      cantidad_anterior,
      cantidad_nueva: cantidad_anterior + (tipo_movimiento === 'entrada' ? cantidad : -cantidad),
      usuario_id: usuario_id || null,
      referencia: referencia || null,
      nota: nota || null
    };

    return await this.create(movimiento);
  }

}

export default new MovimientoLoteService();