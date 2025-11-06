export interface Lote {
  id?: string;
  created_at?: string;
  variante_id: string;
  fecha_entrada?: string;
  fecha_vencimiento?: string | null;
  cantidad_inicial: number;
  precio_compra: number;
  proveedor?: string | null;
  estado?: string;
}