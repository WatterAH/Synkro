"use client";

import { InventoryColumns } from "@/components/inventario/columns";
import { useTable } from "@/hooks/useTable";
import inventoryRouter from "@/routes/inventory";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { flexRender } from "@tanstack/react-table";
import Sucursales from "@/components/global/Sucursales";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/useUtils";
import { Product } from "@/interfaces/Product";
import SelectTypes from "@/components/inventario/SelectTypes";
import SelectColor from "@/components/inventario/SelectColor";
import Header from "@/components/global/Header";
import { useUser } from "@/context/UserContext";

export default function Page() {
  const { user } = useUser();
  const columns = InventoryColumns;
  const [sucursalId, setSucursalId] = useState(user.sucursal_id);
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebounce(searchInput, 500);

  const { table, loading, setFilters, reload } = useTable<
    Product,
    {
      searchTerm: string;
      category: string;
      color: string;
    }
  >({
    sucursalId,
    columns,
    fetcher: (sucursalId, filters) =>
      inventoryRouter.getProducts(sucursalId, filters),
    initialFilters: {
      searchTerm: "",
      category: "all",
      color: "all",
    },
  });

  useEffect(() => {
    setFilters((prev) => ({ ...prev, searchTerm: debouncedSearch }));
  }, [debouncedSearch]);

  return (
    <div className="">
      <Header reload={reload} />
      <div className="flex justify-between items-center">
        <div className="grid grid-cols-5 gap-4 flex-1 p-6">
          <Sucursales sucursalId={sucursalId} setSucursalId={setSucursalId} />
          <SelectTypes setFilters={setFilters} />
          <SelectColor setFilters={setFilters} />
          <div className="col-span-2">
            <Input
              Icon={Search}
              placeholder="Buscar por sku o barcode..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between h-[calc(100vh-12rem)]">
        <Table className="overflow-auto border-t">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="p-5 font-inter text-muted-foreground"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {loading ? (
              Array.from({ length: 10 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell colSpan={columns.length} className="p-2 h-10">
                    <div className="bg-secondary rounded-lg animate-pulse h-4"></div>
                  </TableCell>
                </TableRow>
              ))
            ) : table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      style={{
                        width: cell.column.getSize(),
                      }}
                      className={`p-5 font-inter text-xs ${
                        row.original.sucursal_id == null && "bg-cyan-600/20"
                      }`}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-56 text-center font-semibold text-xl font-inter"
                >
                  Sin resultados
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="w-full flex justify-end items-center gap-2 px-4">
          <div className="bg-cyan-600/20 p-3 rounded-full" />
          <p className="font-inter">Productos en almacen</p>
        </div>
      </div>
    </div>
  );
}
