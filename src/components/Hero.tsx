import React from "react";
import { PenLine, BookOpen } from "lucide-react";

const Hero = () => {
  const handleStartClick = () => {
    const uploadSection = document.getElementById("upload");
    uploadSection?.scrollIntoView({ behavior: "smooth" });
  };

  const handleGalleryClick = () => {
    const gallerySection = document.getElementById("gallery");
    gallerySection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-[calc(100vh-5rem)] flex items-center py-12 overflow-hidden bg-gradient-to-br from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-[#193547]/10 rounded-full blur-xl" />
              <h1 className="text-5xl lg:text-6xl font-bold relative">
                <span className="block text-[#193547]">Comparteix</span>
                <span className="block mt-2">la teva opinió</span>
              </h1>
            </div>

            <p className="text-xl text-gray-600 max-w-lg">
              Un espai on els alumnes de 4t i 5è poden expressar les seves idees
              i pensaments de manera creativa i constructiva.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleStartClick}
                className="flex items-center justify-center gap-2 px-8 py-4 bg-[#193547] text-white rounded-xl font-semibold hover:bg-[#193547]/90 transform hover:-translate-y-1 transition-all duration-200 shadow-lg shadow-[#193547]/20"
              >
                <PenLine className="w-5 h-5" />
                Penja el teu text
              </button>
              <button
                onClick={handleGalleryClick}
                className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#193547] rounded-xl font-semibold hover:bg-gray-50 transform hover:-translate-y-1 transition-all duration-200 shadow-lg border-2 border-[#193547]"
              >
                <BookOpen className="w-5 h-5" />
                Veure textos
              </button>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative">
            {/* Decorative elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] rounded-full border-[32px] border-[#193547]/5 animate-[spin_40s_linear_infinite]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] rounded-full border-[24px] border-[#193547]/10 animate-[spin_30s_linear_infinite_reverse]" />

            {/* Main image container */}
            <div className="relative aspect-square max-w-xl mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-[#193547]/20 to-transparent rounded-full animate-pulse" />
              <img
                src="/hero.avif"
                alt="Hero image"
                className="relative z-10 w-full h-full object-contain p-8 transform hover:scale-105 transition-transform duration-300 rounded-xl"
              />

              {/* Floating decorative elements */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-[#193547]/10 rounded-full blur-xl animate-float" />
              <div className="absolute bottom-12 -left-6 w-16 h-16 bg-[#193547]/20 rounded-full blur-lg animate-float-delayed" />
              <div className="absolute top-1/4 -right-8 w-24 h-24 bg-[#193547]/15 rounded-full blur-xl animate-float" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

