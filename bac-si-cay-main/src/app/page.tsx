import { Header } from "@/components/agri-doctor/header";
import { DiagnosisTabs } from "@/components/agri-doctor/diagnosis-tabs";
import { DiseaseCarousel } from "@/components/agri-doctor/disease-carousel";
import { MedicationList } from "@/components/agri-doctor/medication-list";
import { HistoryDrawer } from "@/components/agri-doctor/history-drawer";
import { PestForecast } from "@/components/agri-doctor/pest-forecast";
import { SidebarProvider, Sidebar, SidebarInset, SidebarContent, SidebarHeader, SidebarTrigger, SidebarFooter } from "@/components/ui/sidebar";
import { SidebarNav } from "@/components/agri-doctor/sidebar-nav";
import { Button } from "@/components/ui/button";
import { History } from "lucide-react";
import { HistoryProvider } from "@/hooks/use-history";

export default function Home() {
  return (
    <HistoryProvider>
      <SidebarProvider defaultOpen={false}>
        <Sidebar>
          <SidebarContent>
            <SidebarHeader>
              <h2 className="font-semibold text-lg">Menu</h2>
            </SidebarHeader>
            <SidebarNav />
            <SidebarFooter>
              <HistoryDrawer>
                  <Button variant="ghost" className="w-full justify-start">
                      <History className="mr-3 h-5 w-5" />
                      <span>Lịch sử</span>
                  </Button>
              </HistoryDrawer>
            </SidebarFooter>
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
          <div className="flex flex-col items-center min-h-screen bg-background text-foreground">
            <Header />
            <main className="container mx-auto px-3 py-4 md:px-4 md:py-8 lg:py-12 flex-grow w-full">
              <div className="grid gap-8 md:gap-16 lg:gap-24">
                <div id="diagnosis">
                  <DiagnosisTabs />
                </div>
                <div id="pest-forecast">
                  <PestForecast />
                </div>
                <div id="common-diseases">
                  <DiseaseCarousel />
                </div>
                <div id="medications">
                  <MedicationList />
                </div>
              </div>
            </main>
            <footer className="w-full p-3 md:p-4 bg-background border-t">
              <div className="container mx-auto text-center text-muted-foreground text-xs">
                <p>&copy; {new Date().getFullYear()} AgriDoctor. Đối tác AI của bạn trong việc chăm sóc cây trồng.</p>
              </div>
            </footer>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </HistoryProvider>
  );
}
