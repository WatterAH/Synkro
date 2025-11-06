export interface User {
  id: string;
  name: string;
  email: string;
  created_at: string;
  sucursal_id: string | null;
}

export const defaultUser = {};
