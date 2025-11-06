"use client"

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SummaryRequest } from "@/interfaces/Summary";
import inventoryRouter from "@/routes/inventory";
import { DollarSign, Package2, TrendingUp, Warehouse } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Page() {
  const [summary, setSummary] = useState<SummaryRequest[]>([]);
  const branches = summary.filter((item) => item.tipo === "Sucursal")
  const total = summary.find((item) => item.tipo === "Total")

  function getStockLevelBadge(nivel: string) {
    if (nivel === "alto")
      return <Badge className="bg-success/20 text-success border-success/30 hover:bg-success/30">Alto</Badge>
    if (nivel === "medio")
      return <Badge className="bg-warning/20 text-warning border-warning/30 hover:bg-warning/30">Medio</Badge>
    if (nivel === "bajo")
      return (
        <Badge className="bg-destructive/20 text-destructive border-destructive/30 hover:bg-destructive/30">Bajo</Badge>
      )
    return <Badge variant="outline">—</Badge>
  }

  function formatCurrency(value: number): string {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(value)
  }


  useEffect(() => {
    async function getSummary() {
      try {
        const result = await inventoryRouter.getSummary();
        setSummary(result);
        console.log(result);
      } catch (_error) {
        toast.error("Error al obtener el resumen de inventario");
      }
    }

    getSummary()
  }, [])

  return (
    <div className="min-h-screen bg-background p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-3">

            <h1 className="text-3xl md:text-4xl font-bold text-pretty">Inventario por Sucursal</h1>
          </div>
        </div>

        {/* Total Summary Cards */}
        {total && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            <MetricCard
              icon={<Package2 className="w-5 h-5 text-primary" />}
              label="Stock Total"
              value={total.stock_total}
              unit="unidades"
            />
            <MetricCard
              icon={<DollarSign className="w-5 h-5 text-accent" />}
              label="Valor Total"
              value={formatCurrency(total.valor_stock)}
            />
            <MetricCard
              icon={<Warehouse className="w-5 h-5 text-primary" />}
              label="Total de Productos"
              value={total.total_productos}
            />
            <MetricCard
              icon={<TrendingUp className="w-5 h-5 text-success" />}
              label="Variantes"
              value={total.total_variantes}
            />
          </div>
        )}

        {/* Branches Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {branches.map((branch) => (
            <Card key={branch.sucursal_id} className="border-border bg-card/50 hover:bg-card/70 transition-colors">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <CardTitle className="text-xl">{branch.nombre_sucursal || 'Almacen central'}</CardTitle>
                    <CardDescription>Información de inventario</CardDescription>
                  </div>
                  {getStockLevelBadge(branch.nivel_stock)}
                </div>
              </CardHeader>
              <CardContent className="font-inter">
                <div className="grid grid-cols-2 gap-6">
                  {/* Stock Total */}
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground font-medium">Stock Total</p>
                    <p className="text-2xl font-bold text-primary">{branch.stock_total}</p>
                    <p className="text-xs text-muted-foreground">unidades</p>
                  </div>

                  {/* Valor Stock */}
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground font-medium">Valor Stock</p>
                    <p className="text-2xl font-bold">{formatCurrency(branch.valor_stock)}</p>
                  </div>

                  {/* Productos */}
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground font-medium">Productos</p>
                    <p className="text-2xl font-bold">{branch.total_productos}</p>
                  </div>

                  {/* Variantes */}
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground font-medium">Variantes</p>
                    <p className="text-2xl font-bold">{branch.total_variantes}</p>
                  </div>

                  {/* Promedio Stock */}
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground font-medium">Promedio Stock</p>
                    <p className="text-2xl font-bold">{branch.promedio_stock}</p>
                  </div>

                  {/* Participación */}
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground font-medium">Participación</p>
                    <div className="flex items-center gap-2">
                      <p className="text-2xl font-bold">{branch.porcentaje_participacion}%</p>
                      <div className="flex-1 h-2 bg-secondary/50 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-cyan-600 to-accent rounded-full"
                          style={{ width: `${branch.porcentaje_participacion}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Total General Card */}
        {total && (
          <Card className="border shadow-xs">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">{total.nombre_sucursal}</CardTitle>
                  <CardDescription>Resumen consolidado de todas las sucursales</CardDescription>
                </div>
                <div className="p-3 rounded-lg bg-primary/20">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="font-inter">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground font-medium mb-1">Stock Total</p>
                  <p className="text-xl font-bold text-primary">{total.stock_total}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium mb-1">Valor Total</p>
                  <p className="text-xl font-bold">{formatCurrency(total.valor_stock)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium mb-1">Productos</p>
                  <p className="text-xl font-bold">{total.total_productos}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium mb-1">Variantes</p>
                  <p className="text-xl font-bold">{total.total_variantes}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium mb-1">Promedio</p>
                  <p className="text-xl font-bold">{total.promedio_stock}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

function MetricCard({
  icon: Icon,
  label,
  value,
  unit,
}: { icon: React.ReactNode; label: string; value: string | number; unit?: string }) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-lg border shadow-xs">
      <div className="p-3 rounded-lg bg-cyan-600 text-white">{Icon}</div>
      <div>
        <p className="text-sm">{label}</p>
        <p className="text-lg font-semibold">
          {value}
          {unit && <span className="text-sm text-muted-foreground ml-1">{unit}</span>}
        </p>
      </div>
    </div>
  )
}
