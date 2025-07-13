import { forwardRef } from "react";
import { NavLink } from "react-router-dom";
import profileImg from "@/assets/profile-image.jpg";
import { navbarLinks } from "@/constants";
import logoLight from "@/assets/logo-light.svg";
import logoDark from "@/assets/logo-dark.svg";

import { cn } from "@/utils/cn";
import type { Ref } from "react";
import type { SidebarProps } from "./interface";
import { Link } from "react-router-dom";


export const Sidebar = forwardRef<HTMLElement, SidebarProps>(
  ({ collapsed }, ref: Ref<HTMLElement>) => {
    return (
      <aside
        ref={ref}
        className={cn(
          "fixed z-[100] flex h-full w-[240px] flex-col overflow-x-hidden border border-slate-200 bg-white shadow-xl rounded-r-2xl transition-all dark:border-slate-700 dark:bg-slate-900 dark:shadow-slate-800/30",
          "backdrop-blur-md bg-white/80 dark:bg-slate-900/70",
          collapsed ? "md:w-[70px] md:items-center" : "md:w-[240px]",
          collapsed ? "max-md:-left-full" : "max-md:left-0"
        )}
      >
        <NavLink to={"/dashboard"}>
          <div className="flex gap-x-3 p-3">
            <img src={logoLight} alt="Logoipsum" className="dark:hidden" />
            <img src={logoDark} alt="Logoipsum" className="hidden dark:block" />
            {!collapsed && (
              <p className="text-lg font-medium text-slate-900 transition-colors dark:text-slate-50">
                Logoipsum
              </p>
            )}
          </div>
        </NavLink>

        {/* Contenedor scrollable y que crece */}
        <div className="flex w-full flex-col gap-y-4 overflow-y-auto overflow-x-hidden p-3 flex-1 [scrollbar-width:_thin]">
          {navbarLinks.map((navbarLink) => (
            <nav
              key={navbarLink.title}
              className={cn("sidebar-group", collapsed && "md:items-center")}
            >
              <p
                className={cn(
                  "sidebar-group-title",
                  collapsed && "md:w-[45px]"
                )}
              >
                {navbarLink.title}
              </p>
              {navbarLink.links.map((link) => (
                <NavLink
                  key={link.label}
                  to={link.path}
                  className={cn(
                    "sidebar-item",
                    collapsed && "md:w-[45px]"
                  )}
                >
                  <link.icon size={22} className="flex-shrink-0" />
                  {!collapsed && (
                    <p className="whitespace-nowrap">{link.label}</p>
                  )}
                </NavLink>
              ))}
            </nav>
          ))}
        </div>

        <Link to="/dashboard/profile">
          <div
            className={cn(
              "flex items-center p-3 gap-x-3 transition-all",
              collapsed && "justify-center"
            )}
          >
            <button className="size-10 overflow-hidden rounded-full shadow-md dark:shadow-slate-800/40">
              <img
                src={profileImg}
                alt="profile image"
                className="size-full object-cover"
              />
            </button>
            {!collapsed && (
              <p className="text-sm font-medium text-slate-900 transition-colors dark:text-slate-50">
                Jhon Doe
              </p>
            )}
          </div>
        </Link>

      </aside>
    );

  }
);

Sidebar.displayName = "Sidebar";
