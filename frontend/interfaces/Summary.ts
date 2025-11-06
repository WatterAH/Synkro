export interface SummaryRequest {
    "tipo": string,
			"sucursal_id": number | null,
			"nombre_sucursal": string,
			"total_variantes": number,
			"total_productos": number,
			"stock_total": number,
			"valor_stock": number,
			"promedio_stock": number,
			"porcentaje_participacion": number,
			"nivel_stock": string
}