export interface MovimientoLote {
  id?: string;
  created_at?: string;
  tipo_movimiento: string;
  usuario_id?: string | null;
  nota?: string | null;
}