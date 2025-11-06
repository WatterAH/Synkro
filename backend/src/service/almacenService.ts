import { Almacen } from "../interfaces/Almacen";
import { supabase } from "../middlewares/connection";

class AlmacenService {

    async create(almacen: Almacen): Promise<Almacen | null> {
        const { data, error } = await supabase
            .from("almacenes")
            .insert([almacen])
            .select('*')
            .single();

        return error ? null : data;
    }

    async delete(id: string): Promise<boolean> {
        const { error } = await supabase
            .from("almacenes")
            .delete()
            .eq("id", id);

        return !error;
    }

    async getById(id: string): Promise<Almacen | null> {
        const { data, error } = await supabase
            .from("almacenes")
            .select("*")
            .eq("id", id)
            .single();

        return error ? null : data;
    }

    async update(id: string, almacen: Partial<Almacen>): Promise<Almacen | null> {
        const { data, error } = await supabase
            .from("almacenes")
            .update(almacen)
            .eq("id", id)
            .select("*")
            .single();

        return error ? null : data;
    }

    async getAll(): Promise<Almacen[]> {
        const { data, error } = await supabase
            .from("almacenes")
            .select("*");

        return error ? [] : data;
    }


}

export default new AlmacenService();