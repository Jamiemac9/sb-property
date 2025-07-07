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
      id: "bedroom-clearance",
      title: "Bedroom Property Clearance",
      beforeImage: "/bedroom-before.jpg",
      afterImage: "/bedroom-before.jpg",
      description: "Complete bedroom clearance and deep clean",
      category: "Property Clearance"
    },
    {
      id: "garden-clearance-east",
      title: "East Devon Garden Clearance",
      beforeImage: "/garden-before-1.jpg",
      afterImage: "/garden-before-1.jpg",
      description: "Professional garden clearance in East Devon",
      category: "Garden Clearance"
    },
    {
      id: "garden-clearance-west",
      title: "West Devon Garden Project",
      beforeImage: "/garden-before-2.jpg",
      afterImage: "/garden-before-2.jpg",
      description: "Large scale garden clearance and restoration",
      category: "Garden Clearance"
    },
    {
      id: "garden-landscaping",
      title: "Garden Landscaping & Clearance",
      beforeImage: "/garden-before-3.jpg",
      afterImage: "/garden-before-3.jpg",
      description: "Complete garden transformation and landscaping",
      category: "Landscaping"
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
            <CarouselContent className="-ml-4">
              {projects.map((project) => {
                return (
                  <CarouselItem key={project.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <Card className="group transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 bg-white/80 glass border-0">
                      <CardContent className="p-0">
                        <div className="relative overflow-hidden rounded-t-xl">
                          <div 
                            className="relative h-64 bg-cover bg-center transition-all duration-700 ease-in-out transform group-hover:scale-105"
                            style={{ backgroundImage: `url('${project.beforeImage}')` }}
                          >
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
                          <p className="text-brand-gray leading-relaxed mb-4">
                            {project.description}
                          </p>

                          <QuoteForm 
                            trigger={
                              <Button className="w-full bg-brand-green hover:bg-brand-green-light text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                                Get Quote for Similar Work
                              </Button>
                            }
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                );
              })}
            </CarouselContent>

            <CarouselPrevious className="absolute -left-12 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-brand-green/20 hover:border-brand-green text-brand-green shadow-xl" />
            <CarouselNext className="absolute -right-12 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-brand-green/20 hover:border-brand-green text-brand-green shadow-xl" />
          </Carousel>
        </div>

        <div className="text-center mt-12">
          <p className="text-brand-gray mb-6">
            Ready to see similar results for your property?
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {selectedProject && (
              <>
                <Badge className="bg-brand-blue text-white px-4 py-2 text-sm">{selectedProject.category}</Badge>
              </>
            )}
          </div>

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