import { User } from "../interfaces/User";
import { supabase } from "../middlewares/connection";


class UserService {

  async createProfile(user: User): Promise<User | null> {
    const { data, error } = await supabase
      .from("users")
      .insert([user])
      .select('*')
      .single();

    return error ? null : data;
  }

  async deleteProfile(id: string): Promise<boolean> {
    const { error } = await supabase
      .from("users")
      .delete()
      .eq("id", id);

    return !error;
  }

  async getProfileById(id: string): Promise<User | null> {
    const { data, error } = await supabase
      .from("users")
      .select("*, sucursales(*)")
      .eq("id", id)
      .single();

    return error ? null : data;
  }

  async updateProfile(id: string, user: Partial<User>): Promise<User | null> {
    const { data, error } = await supabase
      .from("users")
      .update(user)
      .eq("id", id)
      .select("*")
      .single();

    return error ? null : data;
  }

  async getProfilByEmail(email: string): Promise<User | null> {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();
    return error ? null : data;
  }

} export default new UserService();