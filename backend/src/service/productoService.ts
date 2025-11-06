import { Producto } from "../interfaces/Productos";
import { supabase } from "../middlewares/connection";

class ProductoService {

    async create(producto: Producto): Promise<Producto | null> {
        const { data, error } = await supabase
            .from("productos")
            .insert([producto])
            .select('*')
            .single();

        return error ? null : data;
    }

    async delete(id: string): Promise<boolean> {
        const { error } = await supabase
            .from("productos")
            .delete()
            .eq("id", id);

        return !error;
    }

    async getById(id: string): Promise<Producto | null> {
        const { data, error } = await supabase
            .from("productos")
            .select("*")
            .eq("id", id)
            .single();

        return error ? null : data;
    }

    async update(id: string, producto: Partial<Producto>): Promise<Producto | null> {
        const { data, error } = await supabase
            .from("productos")
            .update(producto)
            .eq("id", id)
            .select("*")
            .single();

        return error ? null : data;
    }

    async getAll(): Promise<Producto[]> {
        const { data, error } = await supabase
            .from("productos")
            .select("*");

        return error ? [] : data;
    }

    async getBySkuBase(sku_base: string): Promise<Producto | null> {
        const { data, error } = await supabase
            .from("productos")
            .select("*")
            .eq("sku_base", sku_base)
            .single();

        return error ? null : data;
    }

    async getByCategory(category: string): Promise<Producto[]> {
        const { data, error } = await supabase
            .from("productos")
            .select("*")
            .eq("category", category);

        return error ? [] : data;
    }

    async searchByName(name: string): Promise<Producto[]> {
        const { data, error } = await supabase
            .from("productos")
            .select("*")
            .ilike("name", `%${name}%`);

        return error ? [] : data;
    }

}

export default new ProductoService();