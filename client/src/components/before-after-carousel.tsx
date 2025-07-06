
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface BeforeAfterImage {
  id: string;
  title: string;
  beforeImage: string;
  afterImage: string;
  description: string;
  category: string;
}

export default function BeforeAfterCarousel() {
  const [activeSlides, setActiveSlides] = useState<{ [key: string]: 'before' | 'after' }>({});

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

  const toggleImage = (projectId: string) => {
    setActiveSlides(prev => ({
      ...prev,
      [projectId]: prev[projectId] === 'after' ? 'before' : 'after'
    }));
  };

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
            See Our Work in Action
          </h2>
          <p className="text-xl text-brand-gray max-w-3xl mx-auto">
            Witness the incredible transformations we've achieved for our clients. 
            Click on any image to see the amazing before and after results.
          </p>
        </div>

        <div className="relative">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {projects.map((project) => {
                const isAfter = activeSlides[project.id] === 'after';
                const currentImage = isAfter ? project.afterImage : project.beforeImage;
                
                return (
                  <CarouselItem key={project.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <Card className="group cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 bg-white/80 glass border-0">
                      <CardContent className="p-0">
                        <div className="relative overflow-hidden rounded-t-xl">
                          <div 
                            className="relative h-64 bg-cover bg-center transition-all duration-700 ease-in-out transform group-hover:scale-105"
                            style={{ backgroundImage: `url('${currentImage}')` }}
                            onClick={() => toggleImage(project.id)}
                          >
                            {/* Overlay gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                            
                            {/* Before/After badge */}
                            <div className="absolute top-4 left-4">
                              <Badge 
                                className={`${isAfter ? 'bg-brand-green' : 'bg-brand-orange'} text-white font-semibold px-3 py-1 shadow-lg`}
                              >
                                {isAfter ? 'AFTER' : 'BEFORE'}
                              </Badge>
                            </div>
                            
                            {/* Category badge */}
                            <div className="absolute top-4 right-4">
                              <Badge className={`${getCategoryColor(project.category)} font-medium px-3 py-1 shadow-lg`}>
                                {project.category}
                              </Badge>
                            </div>
                            
                            {/* Click indicator */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div className="bg-white/90 rounded-full p-3 shadow-xl">
                                {isAfter ? (
                                  <ChevronLeft className="w-8 h-8 text-brand-orange" />
                                ) : (
                                  <ChevronRight className="w-8 h-8 text-brand-green" />
                                )}
                              </div>
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
                          
                          {/* Progress indicator */}
                          <div className="flex items-center justify-between">
                            <div className="flex space-x-2">
                              <div className={`w-3 h-3 rounded-full transition-all duration-300 ${!isAfter ? 'bg-brand-orange scale-125' : 'bg-gray-300'}`}></div>
                              <div className={`w-3 h-3 rounded-full transition-all duration-300 ${isAfter ? 'bg-brand-green scale-125' : 'bg-gray-300'}`}></div>
                            </div>
                            <span className="text-sm text-brand-gray font-medium">
                              Click to toggle
                            </span>
                          </div>
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
          <div className="flex flex-wrap justify-center gap-3">
            <Badge className="bg-brand-blue text-white px-4 py-2 text-sm">Property Clearance</Badge>
            <Badge className="bg-brand-green text-white px-4 py-2 text-sm">Garden Clearance</Badge>
            <Badge className="bg-brand-orange text-white px-4 py-2 text-sm">Landscaping</Badge>
            <Badge className="bg-brand-purple text-white px-4 py-2 text-sm">Deep Cleaning</Badge>
          </div>
        </div>
      </div>
    </section>
  );
}
