/* eslint-disable no-shadow */
/* eslint-disable unicorn/new-for-builtins */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable import/extensions */

"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/Components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { Button } from "@/Components/ui/button";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

interface Review {
  id: string;
  name: string;
  date: string;
  rating: number;
  comment: string;
  avatarUrl?: string;
  tripAdvisorLink: string;
}

const reviews: Review[] = [
  {
    id: "1",
    name: "Larry S",
    date: "April 2023",
    rating: 5,
    comment:
      "If you are looking for quality, dependable transportation to anywhere in the Dominican Republic, this is the company you want to call first. They provide excellent communication throughout the entire trip to and from the country from anywhere in the world. Their drivers are courteous and helpful...making sure that they are on time to pickup and deliver you to your destination. Their prices are very reasonable and you will know that you are getting VIP service. Be sure and ask for Daniel Kelly.",
    tripAdvisorLink:
      "https://www.tripadvisor.com/ShowUserReviews-g811253-d10500716-r891173449-VacationsTaxis-Santa_Barbara_de_Samana_Samana_Province_Dominican_Republic.html",
    avatarUrl:
      "https://media-cdn.tripadvisor.com/media/photo-l/1a/f6/e2/e6/default-avatar-2020-45.jpg"
  },
  {
    id: "2",
    name: "Wanda",
    date: "March 2023",
    rating: 5,
    comment:
      "Daniel provided a quote for transportation to and from the El catey samana airport and was great at communicating before and after. And Venecio was a great driver!",
    tripAdvisorLink:
      "https://www.tripadvisor.com/ShowUserReviews-g811253-d10500716-r883777148-VacationsTaxis-Santa_Barbara_de_Samana_Samana_Province_Dominican_Republic.html",
    avatarUrl: "https://media-cdn.tripadvisor.com/media/photo-l/05/7b/31/09/wandawomaninc.jpg"
  },
  {
    id: "3",
    name: "Sylvier",
    date: "November 2023",
    rating: 4,
    comment:
      "I give a 4 because the taxi was late at the pick up at the airport and stress me a bit. But everything was find after that! Excellent service.",
    tripAdvisorLink:
      "https://www.tripadvisor.com/ShowUserReviews-g811253-d10500716-r928547315-VacationsTaxis-Santa_Barbara_de_Samana_Samana_Province_Dominican_Republic.html",
    avatarUrl:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/f6/de/e7/default-avatar-2020-37.jpg?w=200&h=-1&s=1"
  },
  {
    id: "4",
    name: "Jennifer",
    date: "February 2022",
    rating: 5,
    comment:
      "Our driver was helpful and very friendly! A great experience all around. We will definitely use these guys next time around.",
    tripAdvisorLink:
      "https://www.tripadvisor.com/ShowUserReviews-g811253-d10500716-r828661678-VacationsTaxis-Santa_Barbara_de_Samana_Samana_Province_Dominican_Republic.html",
    avatarUrl:
      "https://media-cdn.tripadvisor.com/media/photo-l/1a/f6/f2/b8/default-avatar-2020-26.jpg"
  },
  {
    id: "5",
    name: "Inspiration",
    date: "March 2021",
    rating: 5,
    comment:
      "We took DAT to and from the hotel. Both times they were awaiting us and clearly sought us out. The drivers were friendly and very helpful. Guido even pointed out things as we drove. They had water and cervesos for us - ice cold. We will use them again. The rate was very reasonable as well. There were 8 of us and everyone was thrilled with the cleanliness and comfort of the van. The best part, both were extremely safe drivers and I am usually very skeptical about drivers in foreign countries. I felt very safe.",
    tripAdvisorLink:
      "https://www.tripadvisor.com/ShowUserReviews-g811253-d10500716-r785158464-VacationsTaxis-Santa_Barbara_de_Samana_Samana_Province_Dominican_Republic.html",
    avatarUrl:
      "https://media-cdn.tripadvisor.com/media/photo-l/1a/f6/de/e7/default-avatar-2020-37.jpg"
  },
  {
    id: "6",
    name: "Sean M",
    date: "February 2021",
    rating: 5,
    comment:
      "The service was fast, friendly and efficient. Our experience was great from start to finish, and our driver Yohan (both ways,) was delightful.",
    tripAdvisorLink:
      "https://www.tripadvisor.com/ShowUserReviews-g811253-d10500716-r782365099-VacationsTaxis-Santa_Barbara_de_Samana_Samana_Province_Dominican_Republic.html",
    avatarUrl: "https://media-cdn.tripadvisor.com/media/photo-l/15/ff/f8/cd/sean-m.jpg"
  },
  {
    id: "7",
    name: "Froyd",
    date: "September 2020",
    rating: 5,
    comment:
      "Our pricing was very good the driver was very good and helpful. This was our third time using this service and could not ask for better service",
    tripAdvisorLink:
      "https://www.tripadvisor.com/ShowUserReviews-g811253-d10500716-r770807062-VacationsTaxis-Santa_Barbara_de_Samana_Samana_Province_Dominican_Republic.html",
    avatarUrl:
      "https://media-cdn.tripadvisor.com/media/photo-l/1a/f6/e2/4a/default-avatar-2020-42.jpg"
  },
  {
    id: "8",
    name: "Debra F",
    date: "November 2019",
    rating: 5,
    comment: `This company is fabulous. Picks you up at airport and goes straight to your hotel and vice versus when it’s time to go home.
       Louis is also a fabulous driver and a fun person to chat with. Very knowledgeable, friendly and so very pleasant!!!`,
    tripAdvisorLink:
      "https://www.tripadvisor.com/ShowUserReviews-g811253-d10500716-r729855565-VacationsTaxis-Santa_Barbara_de_Samana_Samana_Province_Dominican_Republic.html",
    avatarUrl:
      "https://media-cdn.tripadvisor.com/media/photo-l/1a/f6/f4/d0/default-avatar-2020-33.jpg"
  }
];

export default function TripAdvisorReviews() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const reviewsPerPage = isMobile ? 2 : 6;
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount =
        direction === "left"
          ? -scrollContainerRef.current.offsetWidth
          : scrollContainerRef.current.offsetWidth;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const scrollPosition = scrollContainerRef.current.scrollLeft;
        const pageWidth = scrollContainerRef.current.offsetWidth;
        const newPage = Math.round(scrollPosition / pageWidth);
        setCurrentPage(newPage);
      }
    };

    scrollContainerRef.current?.addEventListener("scroll", handleScroll);
    return () => scrollContainerRef.current?.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-[2.18rem] leading-[2.68rem] text-center py-5 pb-[3.18rem] ">
          What Other Travellers Say About Us
        </h2>
        <p className="text-xl text-gray-500 text-center mb-8">Don't just take our word for it!</p>
        <p className="text-lg text-gray-600 text-center mb-12">
          In our six+ years of operation, we have been able to successfully provide quality
          transfers to countless travellers around the globe.
        </p>

        <div className="relative ">
          <Button
            variant="outline"
            size="icon"
            className="absolute mb-28 left-0 top-1/2 -translate-y-1/2 z-10"
            onClick={() => scroll("left")}>
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Scroll left</span>
          </Button>

          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto space-x-6 pb-4 scrollbar-hide"
            style={{
              scrollSnapType: "x mandatory",
              scrollbarWidth: "none",
              msOverflowStyle: "none"
            }}>
            {Array.from({ length: totalPages }).map((_, pageIndex) => (
              <div
                key={pageIndex}
                className="flex-shrink-0 w-full grid grid-cols-1 md:grid-cols-3 gap-6 reviews-grid"
                style={{ scrollSnapAlign: "start" }}>
                {reviews
                  .slice(pageIndex * reviewsPerPage, (pageIndex + 1) * reviewsPerPage)
                  .map((review, index) => (
                    <Card
                      key={review.id}
                      className={`bg-white ${
                        isMobile && index > 0 && reviews.length === 1 ? "hidden" : ""
                      }`}>
                      <CardContent className="p-5">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center">
                            <Avatar className="h-10 w-10 mr-4">
                              <AvatarImage src={review.avatarUrl} alt={review.name} />
                              <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="text-lg font-semibold">{review.name}</h3>
                              <p className="text-sm text-gray-500">{review.date}</p>
                            </div>
                          </div>
                          <Link
                            href={review.tripAdvisorLink}
                            target="_blank"
                            rel="noopener noreferrer">
                            <Image
                              src="/images/tripAdvisor.webp"
                              alt="TripAdvisor Logo"
                              width={130}
                              height={50}
                            />
                          </Link>
                        </div>
                        <div className="flex mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-5 w-5 ${
                                i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-gray-600 mb-2">{review.comment}</p>
                        <Link
                          href={review.tripAdvisorLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline">
                          Read More on TripAdvisor
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10"
            onClick={() => scroll("right")}>
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Scroll right</span>
          </Button>
        </div>

        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full ${
                index === currentPage ? "bg-primary" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
