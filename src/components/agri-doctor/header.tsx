"use client";

import { Leaf, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useHistory } from "@/hooks/use-history.tsx";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function Header() {
  const { setOpen } = useHistory();

  return (
    <header className="w-full bg-primary text-primary-foreground shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground -ml-2" />
              <Leaf className="h-6 w-6 md:h-7 md:w-7" />
              <h1 className="text-xl md:text-2xl font-bold font-headline tracking-tight">
                  Bác sĩ Nông nghiệp
              </h1>
            </div>
            <Button
              variant="ghost"
              className="text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground px-3"
              onClick={() => setOpen(true)}
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
