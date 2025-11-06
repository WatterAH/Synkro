import { Product } from "@/interfaces/Product";
import { ColumnDef } from "@tanstack/react-table";

export const InventoryColumns: ColumnDef<Product>[] = [
  {
    accessorKey: "sku",
    header: "SKU",
  },
  {
    accessorKey: "talla",
    header: "Talla",
  },
  {
    id: "name",
    accessorKey: "product",
    header: "Nombre",
    cell: ({ row }) => {
      const product = row.original.product;
      return product.name;
    },
  },
  {
    accessorKey: "cantidad",
    header: "Cantidad",
  },
  {
    accessorKey: "barcode",
    header: "Código de barras",
  },
  {
    accessorKey: "color",
    header: "Color",
  },
];
