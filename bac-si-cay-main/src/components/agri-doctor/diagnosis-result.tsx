
"use client";

import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import type { DiagnosePlantFromImageOutput } from "@/ai/flows/diagnose-plant-from-image";
import type { DiagnosePlantFromSymptomsOutput } from "@/ai/flows/diagnose-plant-from-symptoms";
import type { IdentifyInsectFromImageOutput } from "@/ai/flows/identify-insect-from-image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ClipboardList, FlaskConical, Pill, ShoppingCart, Bug, Leaf, AlertTriangle, Search, Microscope, FlaskRound, BookOpen, Lightbulb, ShieldAlert, ChevronDown } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

type Result = DiagnosePlantFromImageOutput | DiagnosePlantFromSymptomsOutput | IdentifyInsectFromImageOutput;
type Medication = { name: string; reason: string };


interface DiagnosisResultProps {
  result: Result;
  type: 'image' | 'symptoms' | 'insect';
}

function isSymptomResult(result: Result, type: 'image' | 'symptoms' | 'insect'): result is DiagnosePlantFromSymptomsOutput {
    return type === 'symptoms';
}

function isImageResult(result: Result, type: 'image' | 'symptoms' | 'insect'): result is DiagnosePlantFromImageOutput {
    return type === 'image';
}

function isInsectResult(result: Result, type: 'image' | 'symptoms' | 'insect'): result is IdentifyInsectFromImageOutput {
    return type === 'insect';
}

const SeverityProgress = ({ value }: { value: number }) => {
  const getColor = (value: number) => {
    if (value < 40) return "bg-green-500";
    if (value < 70) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getLabel = (value: number) => {
    if (value < 40) return "Nhẹ";
    if (value < 70) return "Trung bình";
    return "Nặng";
  };

  const getIconColorClass = (value: number) => {
    if (value < 40) return "text-green-600";
    if (value < 70) return "text-yellow-600";
    return "text-red-600";
  };
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-sm font-medium">
          <h4 className="flex items-center gap-2 text-primary">
              <ShieldAlert className={cn("h-4 w-4", getIconColorClass(value))}/> Mức độ nghiêm trọng
          </h4>
          <span className={cn(
              "font-bold",
              getIconColorClass(value)
          )}>
              {getLabel(value)} ({value}/100)
          </span>
      </div>
      <Progress value={value} className="h-3 [&>div]:bg-green-500" indicatorClassName={getColor(value)} />
    </div>
  );
};

const SuggestedMedications = ({ medications }: { medications: Medication[] }) => {
    return (
        <div className="space-y-3">
            {(medications || []).map(med => (
                <div key={med.name} className="p-3 border-l-4 border-primary/50 bg-primary/5 rounded-r-md">
                    <p className="font-semibold text-primary">{med.name}</p>
                    <p className="text-sm text-muted-foreground italic">“{med.reason}”</p>
                </div>
            ))}
        </div>
    );
};

const InstructionAccordion = ({ instructions }: { instructions: string }) => {
  return (
      <Accordion type="single" collapsible className="w-full mt-4">
          <AccordionItem value="instructions" className="border-b-0">
              <AccordionTrigger asChild>
                  <Button variant="outline" className="w-full group">
                      <BookOpen className="h-4 w-4 mr-2" />
                      <span className="group-data-[state=closed]:inline group-data-[state=open]:hidden">Xem hướng dẫn</span>
                      <span className="group-data-[state=closed]:hidden group-data-[state=open]:inline">Ẩn hướng dẫn</span>
                      <ChevronDown className="h-4 w-4 ml-auto transition-transform duration-200 group-data-[state=open]:rotate-180" />
                  </Button>
              </AccordionTrigger>
              <AccordionContent>
                  <div className="text-muted-foreground whitespace-pre-wrap prose prose-sm max-w-none pt-4">{instructions}</div>
              </AccordionContent>
          </AccordionItem>
      </Accordion>
  );
}


export function DiagnosisResult({ result, type }: DiagnosisResultProps) {
  const { toast } = useToast();

  const handlePurchase = () => {
    toast({
      title: "Tính năng sắp ra mắt!",
      description: "Chức năng thương mại điện tử và thanh toán sẽ được triển khai trong bản cập nhật sau.",
    });
  };
  
  if (isInsectResult(result, type)) {
    return (
        <Card className="shadow-lg animate-in fade-in-50">
          <CardHeader>
              <CardTitle className="text-lg sm:text-xl md:text-2xl font-headline flex items-center gap-2">
                  <Bug className="h-5 w-5 sm:h-6 sm:w-6 shrink-0" /> 
                  <span className="truncate">Báo cáo nhận dạng côn trùng</span>
              </CardTitle>
              <CardDescription className="text-sm">Dựa trên hình ảnh được tải lên.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 sm:space-y-6 text-sm md:text-base">
              <div>
                <h3 className="text-lg font-semibold flex items-center gap-2"><Leaf className="text-accent"/> Côn trùng được xác định</h3>
                <p className="text-xl text-primary font-bold">{result.identification}</p>
                {result.isHarmful ? (
                    <Badge variant="destructive" className="mt-1"><AlertTriangle className="mr-1 h-3 w-3" /> Gây hại</Badge>
                ) : (
                    <Badge variant="secondary" className="mt-1">Không gây hại</Badge>
                )}
              </div>
              <Separator />
              <div>
                <h3 className="text-lg font-semibold flex items-center gap-2"><Lightbulb className="text-accent"/> Giải thích nhận dạng</h3>
                <p className="text-muted-foreground whitespace-pre-wrap prose prose-sm max-w-none">{result.explanation}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Mô tả</h3>
                <p className="text-muted-foreground whitespace-pre-wrap prose prose-sm max-w-none">{result.description}</p>
              </div>
              <Separator />
              <div>
                <h3 className="text-lg font-semibold flex items-center gap-2 mb-4"><Pill className="text-accent" /> Biện pháp kiểm soát được đề xuất</h3>
                
                {/* Biological Control */}
                <div className="p-4 rounded-lg border bg-emerald-50/50 dark:bg-emerald-900/20">
                    <h4 className="font-semibold text-base md:text-lg flex items-center gap-2 mb-3">
                        <Microscope className="text-emerald-600 dark:text-emerald-400" />
                        Phương pháp Sinh học
                    </h4>
                    <div className="space-y-2">
                        <h5 className="font-semibold mb-2">Phương pháp được đề xuất:</h5>
                        <SuggestedMedications medications={result.controlMethods.biological.suggestedMethods} />
                    </div>
                    <InstructionAccordion instructions={result.controlMethods.biological.instructions} />
                </div>

                <Separator className="my-4"/>

                {/* Chemical Control */}
                 <div className="p-4 rounded-lg border bg-rose-50/50 dark:bg-rose-900/20">
                    <h4 className="font-semibold text-base md:text-lg flex items-center gap-2 mb-3">
                        <FlaskRound className="text-rose-600 dark:text-rose-400" />
                        Phương pháp Hóa học
                    </h4>
                    <div className="space-y-2">
                        <h5 className="font-semibold mb-2">Phương pháp được đề xuất:</h5>
                        <SuggestedMedications medications={result.controlMethods.chemical.suggestedMethods} />
                    </div>
                    <InstructionAccordion instructions={result.controlMethods.chemical.instructions} />
                </div>
              </div>
          </CardContent>
          <CardFooter className="bg-muted/50 p-3 sm:p-4 flex justify-end">
              <Button onClick={handlePurchase} className="w-full sm:w-auto min-h-[48px]" size="lg">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Mua sản phẩm
              </Button>
          </CardFooter>
        </Card>
    )
  }

  let diagnosisText: string = '';
  let explanationText: string = '';
  let confidenceBadge: React.ReactNode = null;
  let biologicalTreatment: { suggestedMedications: Medication[]; applicationInstructions: string; } | null = null;
  let chemicalTreatment: { suggestedMedications: Medication[]; applicationInstructions: string; } | null = null;
  let plantIdentification: string | null = null;
  let similarDiseases: { name: string; imageHint: string }[] = [];
  let severityScore: number | undefined = undefined;

  if (isSymptomResult(result, type)) {
    const confidencePercentage = (result.diagnosis.confidence * 100).toFixed(0);
    const confidenceLevel = result.diagnosis.confidence;
    const badgeVariant = confidenceLevel > 0.8 ? "default" : confidenceLevel > 0.5 ? "secondary" : "destructive";
    
    diagnosisText = result.diagnosis.disease;
    explanationText = result.explanation;
    biologicalTreatment = result.treatment.biological;
    chemicalTreatment = result.treatment.chemical;
    similarDiseases = result.similarDiseases || [];
    severityScore = result.severityScore;
    confidenceBadge = (
        <Badge variant={badgeVariant} className="text-xs md:text-sm shrink-0">
            Độ tin cậy: {confidencePercentage}%
        </Badge>
    );
  } else if (isImageResult(result, type)) {
    diagnosisText = result.diagnosis;
    explanationText = result.explanation;
    biologicalTreatment = result.treatment.biological;
    chemicalTreatment = result.treatment.chemical;
    plantIdentification = result.plantIdentification;
    similarDiseases = result.similarDiseases || [];
    severityScore = result.severityScore;
  }

  return (
    <Card className="shadow-lg animate-in fade-in-50">
      <CardHeader>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-start sm:gap-4">
          <div className="min-w-0">
            <CardTitle className="text-lg sm:text-xl md:text-2xl font-headline flex items-center gap-2">
              <ClipboardList className="h-5 w-5 sm:h-6 sm:w-6 shrink-0" /> 
              <span className="truncate">Báo cáo chẩn đoán</span>
            </CardTitle>
            <CardDescription className="text-sm">Dựa trên {type === 'symptoms' ? 'các triệu chứng' : 'hình ảnh'}.</CardDescription>
          </div>
          {confidenceBadge}
        </div>
      </CardHeader>
      <CardContent className="space-y-6 text-sm md:text-base">
        {plantIdentification && (
             <div>
                <h3 className="text-lg font-semibold flex items-center gap-2"><Leaf className="text-accent"/> Cây được xác định</h3>
                <p className="text-xl text-primary font-bold">{plantIdentification}</p>
            </div>
        )}
        <div>
          <h3 className="text-lg font-semibold flex items-center gap-2"><FlaskConical className="text-accent"/> Bệnh được xác định</h3>
          <p className="text-xl text-primary font-bold">{diagnosisText}</p>
        </div>

        {typeof severityScore !== 'undefined' && (
             <SeverityProgress value={severityScore} />
        )}

        <Separator />
         <div>
          <h3 className="text-lg font-semibold flex items-center gap-2"><Lightbulb className="text-accent"/> Giải thích chẩn đoán</h3>
          <p className="text-muted-foreground whitespace-pre-wrap prose prose-sm max-w-none">{explanationText}</p>
        </div>
        <Separator />
        <div>
          <h3 className="text-lg font-semibold flex items-center gap-2 mb-4"><Pill className="text-accent" /> Điều trị được đề xuất</h3>
          
          {/* Biological Treatment */}
          {biologicalTreatment && (
            <div className="p-4 rounded-lg border bg-emerald-50/50 dark:bg-emerald-900/20">
                <h4 className="font-semibold text-base md:text-lg flex items-center gap-2 mb-3">
                    <Microscope className="text-emerald-600 dark:text-emerald-400" />
                    Phương pháp Sinh học
                </h4>
                <div className="space-y-2">
                    <h5 className="font-semibold mb-2">Thuốc được đề xuất:</h5>
                    <SuggestedMedications medications={biologicalTreatment.suggestedMedications} />
                </div>
                <InstructionAccordion instructions={biologicalTreatment.applicationInstructions} />
            </div>
          )}

          <Separator className="my-4"/>

          {/* Chemical Treatment */}
          {chemicalTreatment && (
             <div className="p-4 rounded-lg border bg-rose-50/50 dark:bg-rose-900/20">
                <h4 className="font-semibold text-base md:text-lg flex items-center gap-2 mb-3">
                    <FlaskRound className="text-rose-600 dark:text-rose-400" />
                    Phương pháp Hóa học
                </h4>
                <div className="space-y-2">
                    <h5 className="font-semibold mb-2">Thuốc được đề xuất:</h5>
                    <SuggestedMedications medications={chemicalTreatment.suggestedMedications} />
                </div>
                 <InstructionAccordion instructions={chemicalTreatment.applicationInstructions} />
            </div>
          )}
        </div>
        {similarDiseases && similarDiseases.length > 0 && (
          <>
            <Separator />
            <div>
              <h3 className="text-lg font-semibold flex items-center gap-2"><Search className="text-accent"/> So sánh với các bệnh tương tự</h3>
              <p className="text-muted-foreground text-xs md:text-sm mt-1">Sử dụng các hình ảnh này để so sánh trực quan với cây của bạn.</p>
              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mt-4">
                {similarDiseases.map((disease) => (
                  <div key={disease.name} className="border rounded-lg p-2 text-center">
                    <Image
                      src={`https://source.unsplash.com/400x300/?${encodeURIComponent(disease.imageHint)}`}
                      data-ai-hint={disease.imageHint}
                      alt={`Hình ảnh của ${disease.name}`}
                      width={400}
                      height={300}
                      className="aspect-[4/3] object-cover w-full rounded-md bg-muted"
                    />
                    <p className="text-xs sm:text-sm font-medium mt-2 truncate leading-tight">{disease.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </CardContent>
      <CardFooter className="bg-muted/50 p-3 sm:p-4 flex justify-end">
        <Button onClick={handlePurchase} className="w-full sm:w-auto min-h-[48px]" size="lg">
          <ShoppingCart className="mr-2 h-4 w-4" />
          Mua đơn thuốc
        </Button>
      </CardFooter>
    </Card>
  );
}
