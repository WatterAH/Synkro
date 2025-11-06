export interface User {
  id: string;
  name: string;
  email: string;
  created_at: string;
  sucursal_id: number | null;
}

export const defaultUser = {};
