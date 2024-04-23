import CategoryCard from "@/components/CategoryCard/CategoryCard";
import SearchBar from "@/components/SearchBar/SearchBar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card"
import { CiFilter } from "react-icons/ci";
import "@/app/globals.css";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image";
import EventCard from "@/components/EventCard/EventCard";
import Footer from "./footer";


export default function Home() {

  const categoryData = [
    {
      img: "/assets/categoryImages/1.png",
      text: "Satsang"
    },
    {
      img: "/assets/categoryImages/2.png",
      text: "Bhajan"
    },
    {
      img: "/assets/categoryImages/3.png",
      text: "Samaroh"
    },
    {
      img: "/assets/categoryImages/4.png",
      text: "Langar"
    },
  ]

  const topPickData = [
    {
      img: "/assets/categoryImages/1.png",
      title: "Bhajan/Kirtan by narendra Chopra",
      location: "New Delhi",
      date: "Aug 13 Sun 10:00am",
    },
    {
      img: "/assets/categoryImages/2.png",
      title: "Bhajan/Kirtan by narendra Chopra",
      location: "New Delhi",
      date: "Aug 13 Sun 10:00am",
    },
    {
      img: "/assets/categoryImages/3.png",
      title: "Bhajan/Kirtan by narendra Chopra",
      location: "New Delhi",
      date: "Aug 13 Sun 10:00am",
    },
  ]

  return (
    <div>
      <SearchBar />

      <Carousel opts={{
        align: "start",
        loop: true,
      }} className="w-full py-3">
        <CarouselContent>
          {Array.from({ length: 3 }).map((_, index) => (
            <CarouselItem key={index}>
              <div className="">
                <Card className="border-0">
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

      <div className="px-[100px]">
        <div className="flex justify-between border-b-2 poppins-bold">
          <p>Browse By Category</p>
          <Button className="bg-clr_primary rounded-full px-5 ">See More</Button>
        </div>
        <div className="flex justify-between py-8">
          {
            categoryData.map((category, index) => {
              return (
                <CategoryCard text={category.text} img={category.img} key={index} />
              )
            })
          }
        </div>
      </div>

      <div className=" h-[303px] relative">
        <div className="w-full h-[252px] left-0 top-[51px] absolute bg-neutral-900" />
        <Image src="/assets/misc/subHero.png" className=" left-[100px] top-0 absolute" width={545} height={303} alt="" />
        <div className=" h-[182px] left-[756px] top-[86px] absolute">
          <div className="w-[302px] h-[60px] top-[122px] absolute">
            <div className="w-[302px] h-[60px] left-0 top-0 absolute bg-orange-600 rounded-[50px] shadow border-2 border-white" />
            <div className="left-[102px] top-[17px] absolute text-center text-white text-lg font-bold">List Events</div>
          </div>
          <div className="w-[417.17px] h-[101px] left-0 top-0 absolute text-white text-[34px] font-bold">List your own Event </div>
          <div className="w-[331px] left-0 top-[55px] absolute text-neutral-100 text-base font-normal font-['DM Sans']">Lorem ipsum dolor sit amet, consectetur adipiscing elit. </div>
        </div>
      </div>

      <div className="px-[100px] pt-16 pb-10">
        <div className="flex justify-between items-center pb-10">
          <p>Top Picks Near You</p>
          <div className="flex items-center">
            <CiFilter className="w-[24px] h-[24px] text-clr_primary" />
            <p>Filter</p>
          </div>
        </div>
        <div className="flex flex-col gap-10">
           
          {
            topPickData.map((pick, index) => {
              return (
                <EventCard title={pick.title} location={pick.location} date={pick.date} img={pick.img} />
              )
            })
          }

        </div>
        <div className="flex justify-center">
          <Button variant="outline" className="border-clr_primary border-2 text-clr_primary rounded-full px-8 ">See More</Button>
        </div>
      </div>

      <Footer />
      
    </div>
  );
}
