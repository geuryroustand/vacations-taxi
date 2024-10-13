/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable import/extensions */
import React from "react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/Components/ui/accordion";

type ContentItem = {
  title: string;
  description: string;
  content: string;
};

const fetchSEOContent = async (): Promise<ContentItem[]> => {
  // Simulating an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          title: "Punta Cana Airport Transfers",
          description:
            "Reliable and comfortable transfers from Punta Cana International Airport to your resort.",
          content:
            "Experience hassle-free travel with our Punta Cana airport transfer service. We offer punctual pickups, professional drivers, and modern vehicles to ensure a smooth start to your vacation in the Dominican Republic."
        },
        {
          title: "Santo Domingo Airport Transfers",
          description:
            "Safe and efficient transfers from Las Américas International Airport in Santo Domingo.",
          content:
            "Start your visit to the capital city stress-free with our Santo Domingo airport transfer service. We provide timely pickups, knowledgeable drivers, and comfortable rides to your destination in Santo Domingo or beyond."
        },
        {
          title: "La Romana Airport Transfers",
          description:
            "Convenient transfers from La Romana International Airport to nearby resorts and attractions.",
          content:
            "Begin your stay in the beautiful La Romana region with ease. Our airport transfer service offers reliable transportation, friendly drivers, and competitive rates for a worry-free arrival experience."
        }
      ]);
    }, 1000);
  });
};

export default function SeoContentSection() {
  const [seoContent, setSEOContent] = React.useState<ContentItem[]>([]);

  React.useEffect(() => {
    const loadContent = async () => {
      const content = await fetchSEOContent();
      setSEOContent(content);
    };
    loadContent();
  }, []);

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-gray-100">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
          Dominican Republic Airport Transfers
        </h2>
        <p className="text-xl text-muted-foreground text-center max-w-[800px] mx-auto mb-12">
          Discover our reliable and comfortable airport transfer services across the Dominican
          Republic. Whether you're heading to a luxurious resort or exploring the vibrant cities,
          we've got your transportation needs covered.
        </p>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {seoContent.map((item, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Card key={index} className="flex flex-col h-full">
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value={`item-${index}`}>
                    <AccordionTrigger>Learn More</AccordionTrigger>
                    <AccordionContent>
                      <div className="pt-4">{item.content}</div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
