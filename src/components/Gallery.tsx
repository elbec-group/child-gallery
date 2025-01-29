import React, { useState, useCallback } from 'react';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { ImageItem } from '../App';

interface GalleryProps {
  images: ImageItem[];
}

const Gallery: React.FC<GalleryProps> = ({ images }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredImages = images.filter(
    img => img.pseudonym.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="gallery" className="py-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Galería de Artistas
        </h2>

        <div className="relative max-w-md mx-auto mb-12">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por nombre artístico..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          />
          {searchTerm && (
            <p className="absolute right-4 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">
              {filteredImages.length} resultado(s)
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredImages.map((image) => (
            <Link
              key={image.id}
              to={`/photo/${image.id}`}
              className="group relative overflow-hidden rounded-lg shadow-lg bg-white"
            >
              <img
                src={image.url}
                alt={image.title || 'Imagen de galería'}
                className="w-full h-64 object-cover transform transition-transform duration-300 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <p className="font-bold">{image.pseudonym}</p>
                  {image.title && (
                    <p className="text-sm text-gray-200">{image.title}</p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;