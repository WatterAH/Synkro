import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { ShoppingBag } from "lucide-react";
import inventoryRouter from "@/routes/inventory";
import { toast } from "sonner";

interface Props {
  sucursalId: string;
  setSucursalId: (id: string) => void;
}

const Sucursales: React.FC<Props> = ({ sucursalId, setSucursalId }) => {
  const [data, setData] = useState<any[]>([]);

  async function getSucursales() {
    try {
      const result = await inventoryRouter.getSucursales();
      setData(result);
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  function handleClick(value: string) {
    setSucursalId(value);
  }

  useEffect(() => {
    getSucursales();
  }, []);

  return (
    <Select value={sucursalId} onValueChange={handleClick}>
      <SelectTrigger className="w-full">
        <ShoppingBag />
        <SelectValue placeholder="Sucursales" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value={"all"}>Todas las sucursales</SelectItem>
        {data.map((d) => (
          <SelectItem key={d.id} value={d.id}>
            {d.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default Sucursales;
