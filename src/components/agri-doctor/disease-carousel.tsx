"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const diseases = [
  {
    name: "Bệnh phấn trắng",
    image: "https://source.unsplash.com/600x400/?powdery,mildew",
    hint: "powdery mildew",
    description: "Một bệnh nấm ảnh hưởng đến nhiều loại cây trồng.",
  },
  {
    name: "Đốm đen",
    image: "https://source.unsplash.com/600x400/?black,spot,leaf",
    hint: "leaf spot",
    description: "Thường gặp trên hoa hồng, gây ra các đốm đen trên lá.",
  },
  {
    name: "Bệnh gỉ sắt",
    image: "https://source.unsplash.com/600x400/?plant,rust,disease",
    hint: "plant rust",
    description: "Bệnh nấm tạo ra các mụn mủ màu đỏ hoặc nâu.",
  },
  {
    name: "Sự phá hoại của rệp",
    image: "https://source.unsplash.com/600x400/?aphids,plant",
    hint: "plant pests",
    description: "Côn trùng nhỏ hút nhựa cây có thể gây hại cho cây trồng.",
  },
  {
    name: "Bệnh cháy lá",
    image: "https://source.unsplash.com/600x400/?leaf,blight",
    hint: "leaf blight",
    description: "Gây ra sự chuyển màu nâu nhanh chóng và chết của các mô thực vật.",
  },
  {
    name: "Thối rễ",
    image: "https://source.unsplash.com/600x400/?root,rot",
    hint: "root rot",
    description: "Thường do tưới quá nhiều nước và thoát nước kém.",
  }
];

export function DiseaseCarousel() {
  return (
    <section>
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-2 font-headline">Các bệnh thường gặp</h2>
      <p className="text-muted-foreground text-center text-sm md:text-base mb-8 max-w-2xl mx-auto">So sánh triệu chứng của cây với hướng dẫn trực quan về các bệnh và sâu bệnh phổ biến.</p>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full max-w-5xl mx-auto"
      >
        <CarouselContent>
          {diseases.map((disease, index) => (
            <CarouselItem key={index} className="basis-full sm:basis-1/2 md:basis-1/3">
              <div className="p-1">
                <Card className="overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                    <Image
                      src={disease.image}
                      alt={`Image of ${disease.name}`}
                      width={600}
                      height={400}
                      data-ai-hint={disease.hint}
                      className="aspect-[3/2] object-cover w-full"
                    />
                  <CardContent className="p-3 md:p-4">
                    <h3 className="text-base md:text-lg font-semibold truncate">{disease.name}</h3>
                    <p className="text-xs md:text-sm text-muted-foreground h-10">{disease.description}</p>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>
    </section>
  );
}
