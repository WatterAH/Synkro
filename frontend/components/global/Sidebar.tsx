import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronDown, Footprints, Layers2 } from "lucide-react";
import { useMenu } from "@/hooks/useMenu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const AppSidebar = () => {
  const pathname = usePathname();
  const items = useMenu();

  return (
    <Sidebar>
      <SidebarHeader className="h-20 p-4 bg-background border-b">
        <div className="flex px-6 lg:px-2 gap-3">
          <Footprints className="text-cyan-600" size={34} />
          <h1 className="text-2xl font- font-extrabold">Synkro</h1>
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-background">
        <SidebarGroup className="mt-2">
          <SidebarGroupContent>
            <SidebarMenu className="space-y-4">
              {items.map((item, i) => {
                let isActive: boolean = false;
                if (item.type == "item" || item.type == "collapsible") {
                  isActive = pathname === item.url;
                }

                return item.type == "separator" ? (
                  <SidebarSeparator key={i} />
                ) : item.type == "item" ? (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      className="[&>svg]:size-5 text-zinc-500 relative px-5"
                      asChild
                    >
                      {item.onClick ? (
                        <div onClick={item.onClick} className="cursor-pointer">
                          {item.icon && (
                            <item.icon
                              className={`${item.iconColor} ${
                                isActive && "text-cyan-600"
                              }`}
                            />
                          )}
                          {isActive && (
                            <div className="w-1.5 h-6 bg-cyan-600 rounded-r-full absolute left-0" />
                          )}
                          <span
                            className={`text-base font-medium tracking-wide font-inter ${
                              isActive && "text-cyan-600"
                            }`}
                          >
                            {item.title}
                          </span>
                        </div>
                      ) : (
                        <Link href={item.url}>
                          {item.icon && (
                            <item.icon
                              className={`${item.iconColor} ${
                                isActive && "text-cyan-600"
                              }`}
                            />
                          )}

                          {isActive && (
                            <div className="w-1.5 h-6 bg-cyan-600 rounded-r-full absolute left-0" />
                          )}
                          <span
                            className={`text-base font-medium tracking-wide font-inter ${
                              isActive && "text-cyan-600"
                            }`}
                          >
                            {item.title}
                          </span>
                        </Link>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ) : (
                  <Collapsible
                    key={item.title}
                    asChild
                    defaultOpen={item.items.some(
                      (subItem) => subItem.url === pathname
                    )}
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton className="[&>svg]:size-5 text-zinc-500 relative px-5 cursor-pointer">
                          <>
                            {item.icon && <item.icon />}
                            <span className="text-base font-medium tracking-wide font-urbanist ">
                              {item.title}
                            </span>
                            <ChevronDown className="ml-auto" />
                          </>
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items.map((subItem) => {
                            const isActive = subItem.url === pathname;
                            return (
                              <SidebarMenuButton
                                key={subItem.title}
                                className="[&>svg]:size-5 text-zinc-500 relative px-5"
                                asChild
                              >
                                <Link href={subItem.url}>
                                  {subItem.icon && (
                                    <subItem.icon
                                      className={`${subItem.iconColor} ${
                                        isActive && "text-cyan-600"
                                      }`}
                                    />
                                  )}

                                  {isActive && (
                                    <div className="w-1.5 h-6 bg-cyan-600 rounded-r-full absolute left-0" />
                                  )}
                                  <span
                                    className={`text-base font-medium tracking-wide font-urbanist ${
                                      isActive && "text-cyan-600"
                                    }`}
                                  >
                                    {subItem.title}
                                  </span>
                                </Link>
                              </SidebarMenuButton>
                            );
                          })}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
