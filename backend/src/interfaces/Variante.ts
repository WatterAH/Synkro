export interface Variante {
  id?: string;
  created_at?: string;
  product_id: string;
  sku: string;
  talla: string;
  barcode: string;
  purchase_price: any; // jsonb puede ser array u objeto
}