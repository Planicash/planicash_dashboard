import { useTheme } from "@/hooks/use-theme";
import { ChevronsLeft, Moon, Sun } from "lucide-preact";
import type { FC } from "react";
import type { HeaderProps } from "./interface";
import { NotificationsDropdown } from "@/components/ui/notifications/notifications";
import { Button } from "@/components/ui/button";


export const Header: FC<HeaderProps> = ({ collapsed, setCollapsed }) => {
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 flex h-[60px] items-center justify-between border-b border-slate-200 bg-white/80 px-4 shadow-md backdrop-blur-md transition-colors dark:border-slate-700 dark:bg-slate-900/70">
      <div className="flex items-center gap-x-3">
        <Button
          variant="ghost"
          size="sm"
          className="btn-ghost size-10"
          onClick={() => setCollapsed(!collapsed)}
        >
          <ChevronsLeft className={collapsed ? "rotate-180" : ""} />
        </Button>

      </div>

      <div className="flex items-center gap-x-3">
        <Button
          variant="ghost"
          size="sm"
          className="relative h-9 w-9 p-0"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          <Sun size={20} className="hidden dark:block btn-ghost size-9" />
          <Moon size={20} className="dark:hidden  btn-ghost size-9" />
        </Button>
        <div className="flex items-center space-x-2">
          <NotificationsDropdown />

        </div>
      </div>
    </header>
  );
};
