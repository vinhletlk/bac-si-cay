import { Header } from "@/components/agri-doctor/header";
import { DiagnosisTabs } from "@/components/agri-doctor/diagnosis-tabs";
import { DiseaseCarousel } from "@/components/agri-doctor/disease-carousel";
import { MedicationList } from "@/components/agri-doctor/medication-list";
import { HistoryDrawer } from "@/components/agri-doctor/history-drawer";
import { PestForecast } from "@/components/agri-doctor/pest-forecast";

export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-background text-foreground">
      <HistoryDrawer>
        <Header />
        <main className="container mx-auto px-4 py-8 md:py-12 flex-grow w-full">
          <div className="grid gap-12 md:gap-24">
            <DiagnosisTabs />
            <PestForecast />
            <DiseaseCarousel />
            <MedicationList />
          </div>
        </main>
        <footer className="w-full p-6 bg-background border-t">
          <div className="container mx-auto text-center text-muted-foreground text-xs md:text-sm">
            <p>&copy; {new Date().getFullYear()} AgriDoctor. Đối tác AI của bạn trong việc chăm sóc cây trồng.</p>
          </div>
        </footer>
      </HistoryDrawer>
    </div>
  );
}
