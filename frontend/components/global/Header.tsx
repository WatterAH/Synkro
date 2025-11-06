import React from "react";
import Create from "../inventario/Create";

interface Props {
  reload: () => void;
}

const Header: React.FC<Props> = ({ reload }) => {
  return (
    <header className="border-b h-20 p-6 flex justify-between items-center">
      <h1 className="text-3xl md:text-4xl font-bold text-pretty">Inventario</h1>
      <Create reload={reload} />
    </header>
  );
};

export default Header;
