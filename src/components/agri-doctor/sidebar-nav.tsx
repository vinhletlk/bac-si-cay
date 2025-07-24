// This is a new file
"use client"

import { useSidebar } from "@/components/ui/sidebar";
import Link from "next/link";
import { Home, Calendar, Bug, Pill, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useHistory } from "@/hooks/use-history.tsx";

const navItems = [
    { href: "#diagnosis", label: "Chẩn đoán AI", icon: Home },
    { href: "#pest-forecast", label: "Dự báo sâu bệnh", icon: Calendar },
    { href: "#common-diseases", label: "Bệnh thường gặp", icon: Bug },
    { href: "#medications", label: "Thuốc phổ biến", icon: Pill },
];

export function SidebarNav() {
    const { setOpenMobile } = useSidebar();
    const pathname = usePathname();
    const { setOpen: setHistoryOpen } = useHistory();

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const targetElement = document.querySelector(href);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
        setOpenMobile(false);
    };

    return (
        <div className="flex-1 overflow-y-auto">
            <nav className="p-2">
                <ul className="space-y-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <li key={item.label}>
                                <Button
                                    asChild
                                    variant="ghost"
                                    className={cn(
                                        "w-full justify-start text-base",
                                        isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : "hover:bg-sidebar-accent/80"
                                    )}
                                >
                                    <a href={item.href} onClick={(e) => handleLinkClick(e, item.href)}>
                                        <item.icon className="mr-3 h-5 w-5" />
                                        <span>{item.label}</span>
                                    </a>
                                </Button>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </div>
    );
}
