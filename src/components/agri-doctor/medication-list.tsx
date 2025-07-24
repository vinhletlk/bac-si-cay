"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const medications = [
  {
    name: "Thuốc diệt nấm sinh học",
    usage: "Kiểm soát hiệu quả bệnh phấn trắng và sương mai. An toàn cho cây trồng và môi trường.",
    image: "https://placehold.co/600x400.png",
    hint: "organic fungicide",
  },
  {
    name: "Dầu Neem",
    usage: "Một loại thuốc trừ sâu và diệt nấm phổ rộng hữu cơ, hiệu quả chống lại rệp và bệnh gỉ sắt.",
    image: "https://placehold.co/600x400.png",
    hint: "neem oil bottle",
  },
  {
    name: "Thuốc trừ sâu Pyrethrin",
    usage: "Thuốc trừ sâu tự nhiên có nguồn gốc từ hoa cúc, hiệu quả chống lại nhiều loại côn trùng.",
    image: "https://placehold.co/600x400.png",
    hint: "pyrethrin insecticide",
  },
  {
    name: "Đồng sunfat",
    usage: "Được sử dụng để ngăn ngừa bệnh bạc lá và các bệnh nấm khác trên rau và trái cây.",
    image: "https://placehold.co/600x400.png",
    hint: "copper sulfate",
  },
  {
    name: "Xà phòng diệt côn trùng",
    usage: "Kiểm soát các loài côn trùng thân mềm như rệp, nhện và ruồi trắng khi tiếp xúc.",
    image: "https://placehold.co/600x400.png",
    hint: "insecticidal soap",
  },
   {
    name: "Lưu huỳnh",
    usage: "Một loại thuốc diệt nấm và thuốc trừ sâu tự nhiên, được sử dụng để kiểm soát bệnh phấn trắng, bệnh gỉ sắt và ve.",
    image: "https://placehold.co/600x400.png",
    hint: "sulfur powder",
  },
];

export function MedicationList() {
  return (
    <section>
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-2 font-headline">Các loại thuốc phổ biến</h2>
      <p className="text-muted-foreground text-center text-sm md:text-base mb-8 max-w-2xl mx-auto">
        Khám phá các phương pháp điều trị hiệu quả. Luôn đọc kỹ nhãn và hướng dẫn sử dụng.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
        {medications.map((med, index) => (
          <Card key={index} className="overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl">
            <Image
              src={med.image}
              alt={`Hình ảnh của ${med.name}`}
              width={600}
              height={400}
              data-ai-hint={med.hint}
              className="aspect-[3/2] object-cover w-full"
            />
            <CardHeader className="p-3 md:p-6 pb-0">
                <CardTitle className="text-base md:text-xl truncate">{med.name}</CardTitle>
            </CardHeader>
            <CardContent className="p-3 md:p-6">
              <CardDescription className="text-xs md:text-sm h-12">{med.usage}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
