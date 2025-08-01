"use client";

import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useSidebar } from "@/components/ui/sidebar";
import { SidebarNav } from "./sidebar-nav";

export function SidebarDrawer() {
  const { openMobile, setOpenMobile } = useSidebar();
  return (
    <div className="block md:hidden">
      <Sheet open={openMobile} onOpenChange={setOpenMobile}>
        <SheetContent side="left" className="p-0 w-64 max-w-full">
          <SidebarNav />
        </SheetContent>
      </Sheet>
    </div>
  );
}