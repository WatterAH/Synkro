import { useUser } from "@/context/UserContext";

import { Boxes, Home, LogOut, LucideIcon, Plane, ToolCase, Wrench } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";

export type MenuItem =
  | {
    type: "item";
    title: string;
    url: string;
    icon?: LucideIcon;
    iconColor?: string;
    onClick?: () => void;
  }
  | { type: "separator"; url: string }
  | {
    type: "collapsible";
    title: string;
    url: string;
    icon?: LucideIcon;
    iconColor?: string;
    items: CollapsibleItem[];
  };

type CollapsibleItem = {
  title: string;
  url: string;
  icon?: LucideIcon;
  iconColor?: string;
  onClick?: () => void;
};

export const useMenu = () => {
  const { user, logout } = useUser();
  const [, , removeCookie] = useCookies();
  const router = useRouter();

  function handleLogout() {
    logout();
    removeCookie("token", { path: "/" });
    router.push("/auth");
  }

  const items: (MenuItem | null)[] = [
    user.sucursal_id == null ? {
      type: "item",
      title: "Inicio",
      url: "/home",
      icon: Home,
    } : null, {
      type: "item",
      title: "Inventario",
      url: "/inventario",
      icon: Boxes,
    },
    {
      type: "item",
      url: "",
      title: "Proximamente...",
      icon: ToolCase,
    },
    {
      type: "item",
      url: "",
      title: "Muy pronto...",
      icon: Plane,
    },
    {
      type: "item",
      url: "",
      title: "Ya casi...",
      icon: Wrench,
    },
    {
      type: "separator",
      url: "",
    },
    {
      type: "item",
      title: "Cerrar sesión",
      url: "",
      icon: LogOut,
      iconColor: "text-red-400",
      onClick: handleLogout,
    },
  ];

  return items.filter(Boolean) as MenuItem[];
};
