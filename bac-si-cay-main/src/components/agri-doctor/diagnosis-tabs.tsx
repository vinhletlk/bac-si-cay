
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import { handleImageDiagnosis, handleSymptomDiagnosis, handleInsectIdentification, DiagnosisResultType } from "@/app/actions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { DiagnosisResult } from "./diagnosis-result";
import { Loader2, Image as ImageIcon, Stethoscope, Bug, UploadCloud, Sparkles } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useHistory, HistoryItem } from "@/hooks/use-history.tsx";

type ActiveMode = "symptoms" | "image" | "insect" | null;

const featureCards = [
  {
    id: "symptoms" as const,
    title: "Mô tả triệu chứng",
    description: "Nhập các dấu hiệu của cây để chẩn đoán.",
    icon: Stethoscope,
  },
  {
    id: "image" as const,
    title: "Chẩn đoán bệnh qua ảnh",
    description: "Tải ảnh cây của bạn để phân tích bệnh.",
    icon: ImageIcon,
  },
  {
    id: "insect" as const,
    title: "Nhận dạng côn trùng",
    description: "Tải ảnh côn trùng để xác định loài.",
    icon: Bug,
  },
];

export function DiagnosisTabs() {
  const [activeMode, setActiveMode] = useState<ActiveMode>(null);
  const [symptoms, setSymptoms] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<DiagnosisResultType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const { addHistory, selectedHistoryItem, setSelectedHistoryItem } = useHistory();

  useEffect(() => {
    if (selectedHistoryItem) {
      setResult(selectedHistoryItem.result);
      setActiveMode(selectedHistoryItem.type);
      
      // Clear form states
      setSymptoms('');
      setImageFile(null);
      setImagePreview(null);
      setError(null);
    }
  }, [selectedHistoryItem]);

  const clearForm = (fullClear: boolean = false) => {
    setResult(null);
    setError(null);
    setSymptoms('');
    setImageFile(null);
    setImagePreview(null);
    if(fullClear) {
      setActiveMode(null);
    }
    if (selectedHistoryItem) {
        setSelectedHistoryItem(null);
    }
    const fileInputs = document.querySelectorAll('input[type="file"]');
    fileInputs.forEach(input => (input as HTMLInputElement).value = '');
  }

  const handleCardClick = (mode: ActiveMode) => {
    if (activeMode === mode && !selectedHistoryItem) {
        clearForm(true);
    } else {
        clearForm();
        setActiveMode(mode);
    }
  };


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setResult(null);
      setError(null);
      setSelectedHistoryItem(null);
    }
  };
  
  const handleSymptomsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!symptoms) return;
    await submitDiagnosis('symptoms', symptoms);
  };

  const handleImageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imagePreview) return;
    await submitDiagnosis('image', imagePreview);
  };

  const handleInsectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imagePreview) return;
    await submitDiagnosis('insect', imagePreview);
  };
  
  const getResultTitle = (result: DiagnosisResultType, type: ActiveMode): string => {
    if (!type) return "Kết quả chẩn đoán";
    switch (type) {
        case 'symptoms':
            return (result as any).diagnosis.disease || "Chẩn đoán triệu chứng";
        case 'image':
            return (result as any).diagnosis || "Chẩn đoán hình ảnh";
        case 'insect':
            return (result as any).identification || "Nhận dạng côn trùng";
        default:
            return "Kết quả chẩn đoán";
    }
  };


  const submitDiagnosis = async (type: "symptoms" | "image" | "insect", data: string) => {
    if (!type) return;
    setIsLoading(true);
    setResult(null);
    setError(null);

    let response;
    if (type === 'symptoms') {
      response = await handleSymptomDiagnosis(data);
    } else if (type === 'image') {
      response = await handleImageDiagnosis(data);
    } else {
      response = await handleInsectIdentification(data);
    }

    if (response.success && response.data) {
      setResult(response.data);
      const title = getResultTitle(response.data, type);
      addHistory({
          id: new Date().toISOString(),
          title: title,
          type: type,
          input: data,
          result: response.data,
          timestamp: new Date().toISOString(),
      });
    } else {
      setError(response.error ?? "Đã xảy ra lỗi không mong muốn.");
      toast({
        variant: "destructive",
        title: "Lỗi",
        description: response.error,
      });
    }
    setIsLoading(false);
  }

  const renderImageForm = (
    onSubmit: (e: React.FormEvent) => Promise<void>,
    inputId: string
  ) => (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor={inputId} className="sr-only">Tải ảnh lên</Label>
        <div className="relative">
            <Input id={inputId} type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
            <div className="flex flex-col items-center justify-center p-4 sm:p-6 border-2 border-dashed rounded-lg border-muted bg-card hover:bg-muted/50 transition-colors min-h-[120px] sm:min-h-[160px]">
                {imagePreview ? (
                    <div className="p-2 bg-white rounded-lg shadow-inner w-full">
                        <Image
                            src={imagePreview}
                            alt="Xem trước"
                            width={200}
                            height={200}
                            className="w-full rounded-md object-contain max-h-32 sm:max-h-40 md:max-h-52"
                        />
                    </div>
                ) : (
                    <div className="text-center">
                        <UploadCloud className="w-10 h-10 sm:w-12 sm:h-12 mx-auto text-muted-foreground" />
                        <p className="mt-2 font-semibold text-primary text-sm sm:text-base">Nhấp để tải ảnh lên</p>
                        <p className="text-xs text-muted-foreground">PNG, JPG (tối đa 5MB)</p>
                    </div>
                )}
            </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row sm:justify-end gap-3">
          <Button type="button" variant="ghost" onClick={() => clearForm()} disabled={isLoading} className="w-full sm:w-auto min-h-[48px]" size="lg">Xóa</Button>
          <Button type="submit" variant="accent" disabled={isLoading || !imageFile} className="w-full sm:w-auto min-h-[48px]" size="lg">
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4"/>}
            Nhận kết quả
          </Button>
      </div>
    </form>
  );

  const renderActiveModeForm = () => {
    if (!activeMode || selectedHistoryItem) return null;

    let content;
    switch(activeMode) {
      case 'symptoms':
        content = (
          <CardContent>
            <form onSubmit={handleSymptomsSubmit} className="space-y-4">
              <Textarea
                placeholder="ví dụ: 'Lá vàng có đốm nâu...'"
                value={symptoms}
                onChange={(e) => {
                  setSymptoms(e.target.value)
                  setResult(null)
                  setError(null)
                }}
                rows={4}
                className="bg-card text-base md:text-sm min-h-[120px]"
              />
              <div className="flex flex-col sm:flex-row sm:justify-end gap-3">
                  <Button type="button" variant="ghost" onClick={() => clearForm()} disabled={isLoading} className="w-full sm:w-auto min-h-[48px]" size="lg">Xóa</Button>
                  <Button type="submit" variant="accent" disabled={isLoading || !symptoms.trim()} className="w-full sm:w-auto min-h-[48px]" size="lg">
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4"/>}
                    Nhận chẩn đoán
                  </Button>
              </div>
            </form>
          </CardContent>
        );
        break;
      case 'image':
        content = (
          <CardContent>
            {renderImageForm(handleImageSubmit, "plant-image")}
          </CardContent>
        );
        break;
      case 'insect':
        content = (
           <CardContent>
            {renderImageForm(handleInsectSubmit, "insect-image")}
          </CardContent>
        );
        break;
      default:
        content = null;
    }
    
    return (
        <Card className="mt-6 w-full max-w-3xl mx-auto animate-in fade-in-50">
            {content}
        </Card>
    )
  }
  
  const shouldShowResult = (result && !isLoading && activeMode) || (selectedHistoryItem && result);

  return (
    <section>
      <div className="w-full max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-6">
        {featureCards.map(card => {
            const Icon = card.icon;
            return (
                <Card 
                    key={card.id}
                    onClick={() => handleCardClick(card.id)}
                    className={cn(
                        "cursor-pointer transition-all duration-300 hover:shadow-xl hover:border-primary/50 active:scale-95",
                        activeMode === card.id ? "border-primary shadow-lg ring-2 ring-primary" : "border-border"
                    )}
                >
                    <CardHeader className="items-center text-center p-3 sm:p-4 md:p-6">
                        <div className={cn(
                            "mb-3 flex h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors",
                            activeMode === card.id ? "bg-primary text-primary-foreground" : ""
                        )}>
                            <Icon className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />
                        </div>
                        <CardTitle className="text-base sm:text-lg md:text-xl leading-snug">{card.title}</CardTitle>
                        <CardDescription className="text-xs sm:text-sm leading-snug">{card.description}</CardDescription>
                    </CardHeader>
                </Card>
            )
        })}
      </div>
      
      <div className="mt-2">
        {renderActiveModeForm()}
      </div>

      {isLoading && (
        <Card className="mt-6 w-full max-w-3xl mx-auto">
            <CardHeader><CardTitle className="text-xl md:text-2xl">Đang phân tích...</CardTitle><CardDescription>Việc này có thể mất một lát.</CardDescription></CardHeader>
            <CardContent className="space-y-4">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
            </CardContent>
        </Card>
      )}

      {shouldShowResult && (
        <div className="mt-6 w-full max-w-3xl mx-auto">
          <DiagnosisResult result={result!} type={activeMode!} />
        </div>
      )}

      {error && !isLoading && (
        <Card className="mt-6 w-full max-w-3xl mx-auto border-destructive bg-destructive/10">
            <CardHeader>
                <CardTitle className="text-destructive text-xl md:text-2xl">Phân tích thất bại</CardTitle>
            </CardHeader>
            <CardContent>
                <p>{error}</p>
                <p className="text-sm text-muted-foreground mt-2">Vui lòng thử lại hoặc diễn đạt lại mô tả của bạn.</p>
            </CardContent>
        </Card>
      )}
    </section>
  );
}
