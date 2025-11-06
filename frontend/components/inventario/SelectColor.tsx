import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Palette } from "lucide-react";
import { colors } from "@/constants/inventory";

interface Props {
  setFilters: (filters: any) => void;
}

const SelectColor: React.FC<Props> = ({ setFilters }) => {
  const [color, setColor] = useState("all");

  function handleClick(value: string) {
    setColor(value);
    setFilters((prev: any) => ({ ...prev, color: value }));
  }

  return (
    <Select value={color} onValueChange={handleClick}>
      <SelectTrigger className="w-full">
        <Palette />
        <SelectValue placeholder="Selecciona una color" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="all">
          <div className="bg-linear-to-r from-red-500 via-yellow-400 to-blue-500 rounded-full p-2" />
          Todos
        </SelectItem>

        {colors.map((c) => (
          <SelectItem key={c.id} value={c.id}>
            <span className="flex items-center gap-2">
              <div className={`${c.bg} rounded-full p-2`} />
              {c.label}
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectColor;
