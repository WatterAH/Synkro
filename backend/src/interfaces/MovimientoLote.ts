export interface MovimientoLote {
  id?: string;
  created_at?: string;
  lote_id: string;
  tipo_movimiento: string;
  cantidad: number;
  cantidad_anterior: number;
  cantidad_nueva: number;
  referencia?: string | null;
  usuario_id?: string | null;
  nota?: string | null;
}