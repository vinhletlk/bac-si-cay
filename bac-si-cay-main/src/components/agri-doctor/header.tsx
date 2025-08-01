"use client";

import { Leaf, History, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useHistory } from "@/hooks/use-history";
import { useSidebar } from "@/components/ui/sidebar";

export function Header() {
  const { toggleSidebar } = useSidebar();
  const { setOpen: setHistoryOpen } = useHistory();

  return (
    <header className="w-full bg-background/95 backdrop-blur-sm shadow-sm sticky top-0 z-40 border-b">
      <div className="container mx-auto px-3 py-2 md:px-4 md:py-3">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSidebar}
                className="-ml-2 shrink-0 h-10 w-10 md:h-11 md:w-11"
              >
                  <Menu className="h-5 w-5 md:h-6 md:w-6" />
                  <span className="sr-only">Mở Menu</span>
              </Button>
              <div className="flex items-center gap-1.5 md:gap-2 min-w-0">
                 <Leaf className="h-5 w-5 md:h-6 md:w-6 lg:h-7 lg:w-7 text-primary shrink-0" />
                 <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold font-headline tracking-tight text-foreground truncate">
                     Bác sĩ Nông nghiệp
                 </h1>
              </div>
            </div>
            <Button
              variant="ghost"
              className="px-2 md:px-3 shrink-0 h-10 md:h-11"
              onClick={() => setHistoryOpen(true)}
            >
              <History className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6" />
              <span className="ml-1.5 md:ml-2 hidden sm:inline text-sm md:text-base">Lịch sử</span>
              <span className="sr-only sm:hidden">Xem lịch sử</span>
            </Button>
        </div>
      </div>
    </header>
  );
}
