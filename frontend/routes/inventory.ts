import { Main, Product } from "@/interfaces/Product";
import { request } from "@/lib/handlers";

class InventoryRouter {
  async getProducts(
    sucursalId: number | null,
    filters?: { searchTerm?: string; category: string; color: string }
  ): Promise<Product[]> {
    let url = `/variantes/${sucursalId}?limit=100`;

    if (filters?.searchTerm) {
      url += `&search=${filters.searchTerm}`;
    }
    if (filters?.color) {
      url += `&color=${filters.color}`;
    }
    if (filters?.category) {
      url += `&category=${filters.category}`;
    }

    return request.get(url);
  }

  async getMainProducts(): Promise<Main[]> {
    return request.get("/productos");
  }

  async getSucursales(userId: string): Promise<any[]> {
    return request.get(`/sucursales?userId=${userId}`);
  }

  async create(data: Partial<Product>): Promise<Product[]> {
    return request.post("/variantes", JSON.stringify(data));
  }

  async getLotes(): Promise<any[]> {
    return request.get("/lotes");
  }
}

const inventoryRouter = new InventoryRouter();

export default inventoryRouter;
