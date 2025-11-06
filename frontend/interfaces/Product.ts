export interface Product {
  id: string;
  sku: string;
  talla: string;
  barcode: string;
  purchase_price: number[];
  color: string;
  tipo: string;
  product_id: string;
  sucursal_id: string | null;
  cantidad: number;
  variante: string;
  product: {
    id: string;
    sku_base: string;
    name: string;
    category: string;
  };
}

export interface Lote {
  created_at: string;
  variante_id: string;
  cantidad: number;
  precio_compra: number;
  estado: string;
  num: number;
}

export interface Main {
  id: string;
  created_at: string;
  sku_base: string;
  name: string;
}
