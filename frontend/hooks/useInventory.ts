import { Main } from "@/interfaces/Product";
import inventoryRouter from "@/routes/inventory";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const useMainProduct = () => {
  const [data, setData] = useState<Main[]>([]);

  useEffect(() => {
    async function getMainProducts() {
      try {
        const result = await inventoryRouter.getMainProducts();
        setData(result);
      } catch (error: any) {
        toast.error(error.message);
      }
    }

    getMainProducts();
  }, []);

  return { data };
};

export const useLotes = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    async function getLotes() {
      try {
        const result = await inventoryRouter.getLotes();
        setData(result);
      } catch (error: any) {
        toast.error(error.message);
      }
    }

    getLotes();
  }, []);

  return { data };
};
