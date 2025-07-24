"use client";

import { Leaf, History, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useHistory } from "@/hooks/use-history.tsx";
import { useSidebar } from "@/components/ui/sidebar";

export function Header() {
  const { toggleSidebar } = useSidebar();
  const { setOpen: setHistoryOpen } = useHistory();

  return (
    <header className="w-full bg-background/95 backdrop-blur-sm shadow-sm sticky top-0 z-40 border-b">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSidebar}
                className="-ml-2"
              >
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Mở Menu</span>
              </Button>
              <div className="flex items-center gap-2">
                 <Leaf className="h-6 w-6 md:h-7 md:w-7 text-primary" />
                 <h1 className="text-xl md:text-2xl font-bold font-headline tracking-tight text-foreground">
                     Bác sĩ Nông nghiệp
                 </h1>
              </div>
            </div>
            <Button
              variant="ghost"
              className="px-3"
              onClick={() => setHistoryOpen(true)}
            >
              <History className="h-5 w-5 md:h-6 md:w-6" />
              <span className="ml-2 hidden sm:inline">Lịch sử</span>
              <span className="sr-only sm:hidden">Xem lịch sử</span>
            </Button>
        </div>
      </div>
    </header>
  );
}
