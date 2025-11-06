import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

type UseDataTableProps<T, F = Record<string, any>> = {
  sucursalId: number | null;
  columns: ColumnDef<T, any>[];
  fetcher: (sucursalId: number | null, filters?: F) => Promise<T[]>;
  canExpand?: boolean;
  limit?: number;
  initialData?: T[];
  initialFilters?: F;
};

export function useTable<T, F = Record<string, any>>({
  sucursalId,
  columns,
  fetcher,
  limit = 10,
  canExpand = false,
  initialData = [],
  initialFilters = {} as F,
}: UseDataTableProps<T, F>) {
  const isFirstRender = useRef(true);
  const [data, setData] = useState<T[]>(initialData);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState(initialFilters);
  const [refreshKey, setRefreshKey] = useState(0);

  const table = useReactTable({
    data,
    columns,
    pageCount: Math.ceil(total / limit),
    manualPagination: true,
    onPaginationChange: (updater) => {
      const newPagination =
        typeof updater === "function"
          ? updater(table.getState().pagination)
          : updater;
      setPage(newPagination.pageIndex);
    },
    state: {
      pagination: { pageIndex: page, pageSize: limit },
    },
    getCoreRowModel: getCoreRowModel(),
    getRowCanExpand: () => canExpand,
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await fetcher(sucursalId, filters);
      setData(result);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const reload = () => setRefreshKey((k) => k + 1);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    fetchData();
  }, [sucursalId, filters, refreshKey]);

  return {
    data,
    page,
    table,
    total,
    limit,
    reload,
    filters,
    columns,
    loading,
    setPage,
    setData,
    setTotal,
    setFilters,
    setLoading,
  };
}
