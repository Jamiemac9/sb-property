import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import QuoteForm from "@/components/quote-form";

interface BeforeAfterImage {
  id: string;
  title: string;
  beforeImage: string;
  afterImage: string;
  description: string;
  category: string;
}

export default function BeforeAfterCarousel() {
  const [selectedProject, setSelectedProject] = useState<BeforeAfterImage | null>(null);

  const projects: BeforeAfterImage[] = [
    {
      id: "garden-clearance-west",
      title: "Garden Project",
      beforeImage: "/garden-before-1.webp",
      afterImage: "/garden-before-2.webp",
      description: "Large scale garden clearance and restoration",
      category: "Garden Clearance"
    },
    {
      id: "garden-landscaping",
      title: "Garden Landscaping & Clearance",
      beforeImage: "/garden-before-3.webp",
      afterImage: "/garden-before-3.webp",
      description: "Complete garden transformation and landscaping",
      category: "Landscaping"
    },
    {
      id: "bedroom-clearance",
      title: "Bedroom Clearance",
      beforeImage: "/bedroom-before.jpg",
      afterImage: "/bedroom-before.jpg",
      description: "Full bedroom and household contents clearance",
      category: "Property Clearance"
    }
  ];

  // Initialize with first project
  useEffect(() => {
    if (projects.length > 0 && !selectedProject) {
      setSelectedProject(projects[0]);
    }
  }, []);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Property Clearance": return "bg-brand-blue text-white";
      case "Garden Clearance": return "bg-brand-green text-white";
      case "Landscaping": return "bg-brand-orange text-white";
      default: return "bg-brand-gray text-white";
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-brand-blue-lighter via-white to-brand-green-lighter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            No Job Too Big or Small
          </h2>
          <p className="text-xl text-brand-gray max-w-3xl mx-auto">
            From single item removal to complete property clearances, we handle projects of all sizes with the same professional care and attention to detail.
          </p>
        </div>

        <div className="relative">
          <Carousel 
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {projects.map((project) => {
                return (
                  <CarouselItem key={project.id} className="pl-2 md:pl-4 basis-4/5 sm:basis-3/5 md:basis-1/2 lg:basis-1/3">
                    <Card className="group transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 bg-white/80 glass border-0">
                      <CardContent className="p-0">
                        <div className="relative overflow-hidden rounded-t-xl">
                          <div className="relative h-64 overflow-hidden">
                            <img
                              src={project.beforeImage}
                              alt={project.title}
                              width="800"
                              height="900"
                              loading="lazy"
                              decoding="async"
                              className="absolute inset-0 h-full w-full object-cover object-center transition-all duration-700 ease-in-out transform group-hover:scale-105"
                            />
                            {/* Overlay gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

                            {/* Category badge */}
                            <div className="absolute top-4 right-4">
                              <Badge className={`${getCategoryColor(project.category)} font-medium px-3 py-1 shadow-lg`}>
                                {project.category}
                              </Badge>
                            </div>
                          </div>
                        </div>

                        <div className="p-6">
                          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-brand-green transition-colors">
                            {project.title}
                          </h3>
                          <p className="text-brand-gray leading-relaxed">
                            {project.description}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                );
              })}
            </CarouselContent>

            <CarouselPrevious className="absolute -left-6 md:-left-12 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-brand-green/20 hover:border-brand-green text-brand-green shadow-xl h-8 w-8 md:h-10 md:w-10" />
            <CarouselNext className="absolute -right-6 md:-right-12 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-brand-green/20 hover:border-brand-green text-brand-green shadow-xl h-8 w-8 md:h-10 md:w-10" />
          </Carousel>
        </div>

        <div className="text-center mt-12">
          <QuoteForm 
            trigger={
              <Button className="bg-brand-green hover:bg-brand-green-light text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg transition-all duration-200 hover:shadow-xl">
                Get Your FREE Quote Today
              </Button>
            }
          />
        </div>
      </div>
    </section>
  );
}