import { Inventario } from "../interfaces/Inventario";
import { supabase } from "../middlewares/connection";

class InventarioService {

    async create(inventario: Inventario): Promise<Inventario | null> {
        const { data, error } = await supabase
            .from("inventario")
            .insert([inventario])
            .select('*')
            .single();

        return error ? null : data;
    }

    async delete(id: string): Promise<boolean> {
        const { error } = await supabase
            .from("inventario")
            .delete()
            .eq("id", id);

        return !error;
    }

    async getById(id: string): Promise<Inventario | null> {
        const { data, error } = await supabase
            .from("inventario")
            .select("*")
            .eq("id", id)
            .single();

        return error ? null : data;
    }

    async update(id: string, inventario: Partial<Inventario>): Promise<Inventario | null> {
        const { data, error } = await supabase
            .from("inventario")
            .update(inventario)
            .eq("id", id)
            .select("*")
            .single();

        return error ? null : data;
    }

    async getAll(): Promise<any[]> {
        const { data, error } = await supabase
            .from("inventario")
            .select(`
      *,
      almacenes(*),
      variante:variantes(
        *,
        producto:productos(*)
      )
    `);

        return error ? [] : data;
    }

    async getAllBySucursal(sucursal_id: string): Promise<any[]> {
        const { data, error } = await supabase
            .from("inventario")
            .select(`
      *,
      almacenes(*),
      variantes(
        *,
        productos(*)
      )
    `)
            .eq("sucursal_id", sucursal_id); // Ajusta el nombre del campo

        return error ? [] : data;
    }
}
export default new InventarioService();
