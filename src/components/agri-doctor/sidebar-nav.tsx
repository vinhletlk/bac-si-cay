// This is a new file
"use client"

import { useSidebar } from "@/components/ui/sidebar";
import Link from "next/link";
import { Home, Calendar, Bug, Pill } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
    { href: "#diagnosis", label: "Bảng điều khiển", icon: Home },
    { href: "#pest-forecast", label: "Dự báo sâu bệnh", icon: Calendar },
    { href: "#common-diseases", label: "Bệnh thường gặp", icon: Bug },
    { href: "#medications", label: "Thuốc phổ biến", icon: Pill },
];

export function SidebarNav() {
    const { setOpenMobile } = useSidebar();
    const pathname = usePathname();

    const handleLinkClick = () => {
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
                                    <Link href={item.href} onClick={handleLinkClick}>
                                        <item.icon className="mr-3 h-5 w-5" />
                                        <span>{item.label}</span>
                                    </Link>
                                </Button>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </div>
    );
}
