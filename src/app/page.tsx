import { Header } from "@/components/agri-doctor/header";
import { DiagnosisTabs } from "@/components/agri-doctor/diagnosis-tabs";
import { DiseaseCarousel } from "@/components/agri-doctor/disease-carousel";
import { MedicationList } from "@/components/agri-doctor/medication-list";
import { HistoryDrawer } from "@/components/agri-doctor/history-drawer";
import { PestForecast } from "@/components/agri-doctor/pest-forecast";
import { SidebarProvider, Sidebar, SidebarInset, SidebarContent, SidebarHeader } from "@/components/ui/sidebar";
import { SidebarNav } from "@/components/agri-doctor/sidebar-nav";

export default function Home() {
  return (
    <SidebarProvider defaultOpen={false}>
      <Sidebar>
        <SidebarContent>
          <SidebarHeader>
            <h2 className="font-semibold text-lg">Menu</h2>
          </SidebarHeader>
          <SidebarNav />
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <div className="flex flex-col items-center min-h-screen bg-background text-foreground">
          <HistoryDrawer>
            <Header />
            <main className="container mx-auto px-4 py-8 md:py-12 flex-grow w-full">
              <div className="grid gap-16 md:gap-24">
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
            <footer className="w-full p-4 bg-background border-t">
              <div className="container mx-auto text-center text-muted-foreground text-xs">
                <p>&copy; {new Date().getFullYear()} AgriDoctor. Đối tác AI của bạn trong việc chăm sóc cây trồng.</p>
              </div>
            </footer>
          </HistoryDrawer>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
