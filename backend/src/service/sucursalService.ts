import { Sucursal } from "../interfaces/Sucursal";
import { supabase } from "../middlewares/connection";

class SucursalService {
  async create(sucursal: Sucursal): Promise<Sucursal | null> {
    const { data, error } = await supabase
      .from("sucursales")
      .insert(sucursal)
      .select("*")
      .single();

    return error ? null : data;
  }

  async delete(id: number): Promise<boolean> {
    const { error } = await supabase.from("sucursales").delete().eq("id", id);

    return !error;
  }

  async getById(id: number): Promise<Sucursal[] | null> {
    const { data, error } = await supabase
      .from("sucursales")
      .select("*")
      .eq("id", id);

    return error ? null : data;
  }

  async update(
    id: number,
    sucursal: Partial<Sucursal>
  ): Promise<Sucursal | null> {
    const { data, error } = await supabase
      .from("sucursales")
      .update(sucursal)
      .eq("id", id)
      .select("*")
      .single();

    return error ? null : data;
  }

  async getAll(): Promise<Sucursal[]> {
    const { data, error } = await supabase.from("sucursales").select("*");

    return error ? [] : data;
  }

  async getByName(name: string): Promise<Sucursal | null> {
    const { data, error } = await supabase
      .from("sucursales")
      .select("*")
      .eq("name", name)
      .single();

    return error ? null : data;
  }
}

export default new SucursalService();
