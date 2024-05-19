"use client";

import { useDrawer } from "@/hooks/use-drawer";
import Sidebar from "./Sidebar";
import { Sheet, SheetContent } from "@/components/ui/sheet";

export default function MobileSidebar() {
  const { onClose, isOpen } = useDrawer();

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="p-0">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
}
