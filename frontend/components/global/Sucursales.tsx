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
import { useUser } from "@/context/UserContext";

interface Props {
  sucursalId: number | null;
  setSucursalId: (id: number | null) => void;
}

const Sucursales: React.FC<Props> = ({ sucursalId, setSucursalId }) => {
  const { user } = useUser();
  const [value, setValue] = useState(sucursalId == null ? "all" : sucursalId);
  const [data, setData] = useState<any[]>([]);

  async function getSucursales() {
    try {
      const result = await inventoryRouter.getSucursales(user.id);
      setData(result);
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  function handleClick(value: string) {
    setValue(value);
    setSucursalId(value as any);
  }

  useEffect(() => {
    if (!user.id) return;
    getSucursales();
  }, [user.id]);

  return (
    <Select value={value as any} onValueChange={handleClick}>
      <SelectTrigger className="w-full">
        <ShoppingBag />
        <SelectValue placeholder="Sucursales" />
      </SelectTrigger>

      <SelectContent>
        {!user.sucursal_id && (
          <SelectItem value={"all"}>Todas las sucursales</SelectItem>
        )}
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
