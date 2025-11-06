import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Tag } from "lucide-react";

interface Props {
  setFilters: (filters: any) => void;
}

const SelectTypes: React.FC<Props> = ({ setFilters }) => {
  const [category, setCategory] = useState<string>("all");

  function handleClick(value: string) {
    setCategory(value);
    setFilters((prev: any) => ({ ...prev, category: value }));
  }

  return (
    <Select value={category} onValueChange={handleClick}>
      <SelectTrigger className="w-full">
        <Tag />
        <SelectValue placeholder="Selecciona una categoría" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="all">Todas las categorías</SelectItem>

        <SelectItem value="H">Hombre</SelectItem>
        <SelectItem value="M">Mujer</SelectItem>
        <SelectItem value="N">Niños</SelectItem>
        <SelectItem value="T">Teni deportivo</SelectItem>
        <SelectItem value="A">Accesorios</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default SelectTypes;
