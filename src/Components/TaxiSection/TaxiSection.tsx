/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/no-array-index-key */
/* eslint-disable import/extensions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card";
import Image from "next/image";
import style from "./TaxiSection.module.css";

const taxis = [
  {
    name: "Private Taxi",
    description: "Up to 3 passengers",

    image: "/images/minivan6.jpg"
  },
  {
    name: "Private Minivan",
    description: "Up to 4 passengers",
    image: "/images/minivan6.jpg"
  },
  {
    name: "Private Minivan",
    description: "Up to 6 passengers",
    image: "/images/minivan8.png"
  },
  {
    name: "Private Minibus",
    description: "Up to 16 passengers",
    image: "/images/minivan16.jpg"
  },
  {
    name: "Private Minicoach",
    description: "Up to 22 passengers",
    image: "/images/bus22.jpeg"
  },
  {
    name: "Private Coach",
    description: "Up to 44 passengers",
    image: "/images/bus54.jpg"
  }
];

export default function TaxiSection() {
  return (
    <section className={`${style.taxiSection} w-full py-12 md:py-24 `}>
      <div className="container px-4 md:px-6">
        <h2 className={`${style.heading} text-center mb-8 leading-tight`}>Our Taxi Fleet</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {taxis.map((taxi, index) => (
            <Card key={index} className="bg-white overflow-hidden">
              <CardHeader className="p-2">
                <Image
                  src={taxi.image}
                  alt={taxi.name}
                  width={150}
                  height={100}
                  className="w-full h-auto object-cover rounded-md"
                />
              </CardHeader>
              <CardContent className="p-2">
                <CardTitle className="text-sm mb-1">{taxi.name}</CardTitle>
                <p className="text-xs text-muted-foreground">{taxi.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
