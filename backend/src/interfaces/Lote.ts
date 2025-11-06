export interface Lote {
  created_at?: string;
  variante_id: string;
  fecha_entrada?: string;
  cantidad: number;
  precio_compra: number;
  estado?: string;
  num: number;
}