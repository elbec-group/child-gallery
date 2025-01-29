import React from 'react';
import { Camera, Heart, Star } from 'lucide-react';

const Hero = () => {
  const handleStartClick = () => {
    const uploadSection = document.getElementById('upload');
    uploadSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleGalleryClick = () => {
    const gallerySection = document.getElementById('gallery');
    gallerySection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="py-20 md:py-32">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex justify-center space-x-4 mb-8">
          <Camera className="h-12 w-12 text-purple-600 animate-bounce" />
          <Star className="h-12 w-12 text-pink-600 animate-pulse" />
          <Heart className="h-12 w-12 text-red-500 animate-bounce" />
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent">
          ¡Explora tu Creatividad!
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
          Un espacio seguro donde los pequeños artistas pueden compartir
          sus mejores momentos fotográficos y descubrir el mundo a través
          de sus propios ojos.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <button 
            onClick={handleStartClick}
            className="px-8 py-3 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            Comenzar Aventura
          </button>
          <button 
            onClick={handleGalleryClick}
            className="px-8 py-3 bg-white text-purple-600 rounded-full font-semibold hover:bg-purple-50 transform hover:scale-105 transition-all duration-200 shadow-lg border-2 border-purple-600"
          >
            Ver Galería
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;