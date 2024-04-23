import SearchBar from "@/components/SearchBar/SearchBar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image";


export default function Home() {
  return (
    <div>
      <SearchBar />

      <Carousel opts={{
        align: "start",
        loop: true,
      }} className="w-full border-white">
        <CarouselContent className="border-white">
          {Array.from({ length: 3 }).map((_, index) => (
            <CarouselItem key={index}>
              <div className="">
                <Card>
                  <CardContent className="flex items-center justify-center p-6">
                    <Image
                      priority
                      height="460"
                      width="1239"
                      alt="banner"
                      src={`/assets/homePageCarosel/${index + 1}.png`}
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
      </Carousel>

    </div>
  );
}
