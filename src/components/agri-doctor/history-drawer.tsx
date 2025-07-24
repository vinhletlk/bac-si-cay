
"use client";

import { useState, useMemo, ReactNode, cloneElement, ReactElement } from "react";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import { useHistory, HistoryItem } from "@/hooks/use-history.tsx";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trash2, Stethoscope, Image as ImageIcon, Bug, AlertTriangle, Search } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const TypeIcon = ({ type }: { type: 'image' | 'symptoms' | 'insect' }) => {
    switch (type) {
        case 'image': return <ImageIcon className="h-5 w-5 text-muted-foreground" />;
        case 'symptoms': return <Stethoscope className="h-5 w-5 text-muted-foreground" />;
        case 'insect': return <Bug className="h-5 w-5 text-muted-foreground" />;
        default: return null;
    }
}

function HistorySheet() {
    const { history, open, setOpen, setSelectedHistoryItem, deleteHistory, clearHistory } = useHistory();
    const [searchQuery, setSearchQuery] = useState("");

    const handleItemClick = (item: HistoryItem) => {
        setSelectedHistoryItem(item);
        setOpen(false);
    }
    
    const filteredHistory = useMemo(() => {
        if (!searchQuery) {
            return history;
        }
        return history.filter(item =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [history, searchQuery]);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetContent className="flex flex-col">
                <SheetHeader>
                    <SheetTitle>Lịch sử chẩn đoán</SheetTitle>
                    <SheetDescription>
                        Xem lại hoặc tìm kiếm các lần chẩn đoán trước đây của bạn.
                    </SheetDescription>
                </SheetHeader>
                
                <div className="relative mt-2">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Tìm kiếm trong lịch sử..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-8"
                    />
                </div>

                {history.length > 0 && (
                     <AlertDialog>
                        <AlertDialogTrigger asChild>
                           <Button variant="destructive" className="w-full mt-2">
                                <Trash2 className="mr-2 h-4 w-4"/>
                                Xóa tất cả lịch sử
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                            <AlertDialogTitle>Bạn có chắc không?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Hành động này không thể được hoàn tác. Thao tác này sẽ xóa vĩnh viễn tất cả lịch sử chẩn đoán của bạn.
                            </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                            <AlertDialogCancel>Hủy</AlertDialogCancel>
                            <AlertDialogAction onClick={() => {
                                clearHistory();
                                setSearchQuery("");
                            }}>Tiếp tục</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                )}
                <ScrollArea className="flex-grow my-4">
                    {filteredHistory.length > 0 ? (
                        <div className="space-y-4 pr-4">
                            {filteredHistory.map(item => (
                                <div key={item.id} className="group relative border p-3 rounded-lg hover:bg-muted/50 transition-colors">
                                    <button onClick={() => handleItemClick(item)} className="w-full text-left space-y-2">
                                        <div className="flex items-start gap-4">
                                            {item.type !== 'symptoms' ? (
                                                <Image
                                                    src={item.input}
                                                    alt="Input image"
                                                    width={64}
                                                    height={64}
                                                    className="w-16 h-16 rounded-md object-cover bg-card"
                                                />
                                            ) : (
                                                <div className="w-16 h-16 rounded-md bg-card flex items-center justify-center">
                                                     <TypeIcon type={item.type}/>
                                                </div>
                                            )}
                                            <div className="flex-1">
                                                <p className="font-semibold text-sm leading-snug">{item.title}</p>
                                                <p className="text-xs text-muted-foreground mt-1">
                                                    {formatDistanceToNow(new Date(item.timestamp), { addSuffix: true, locale: vi })}
                                                </p>
                                            </div>
                                        </div>
                                    </button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="absolute top-2 right-2 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                                        onClick={() => deleteHistory(item.id)}
                                    >
                                        <Trash2 className="h-4 w-4 text-destructive" />
                                        <span className="sr-only">Xóa mục</span>
                                    </Button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground p-8">
                            {history.length > 0 && searchQuery ? (
                                <>
                                    <Search className="h-12 w-12 mb-4" />
                                    <p className="font-semibold">Không tìm thấy kết quả</p>
                                    <p className="text-sm">Không tìm thấy mục nào khớp với tìm kiếm của bạn.</p>
                                </>
                            ) : (
                                <>
                                    <AlertTriangle className="h-12 w-12 mb-4" />
                                    <p className="font-semibold">Không có lịch sử</p>
                                    <p className="text-sm">Các lần chẩn đoán của bạn sẽ xuất hiện ở đây.</p>
                                </>
                            )}
                        </div>
                    )}
                </ScrollArea>
            </SheetContent>
        </Sheet>
    )
}

export function HistoryDrawer({ children }: { children: ReactNode }) {
    const { setOpen } = useHistory();
    const childWithClickHandler = cloneElement(children as ReactElement, {
      onClick: () => setOpen(true),
    });
  
    return (
      <>
        {childWithClickHandler}
        <HistorySheet />
      </>
    );
}
