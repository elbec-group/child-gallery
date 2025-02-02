import React, { useState } from "react";
import { Search, Loader2, AlertCircle, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import type { ImageItem } from "../App";

interface GalleryProps {
  images: ImageItem[];
  isLoading: boolean;
  error: string | null;
  isAdmin?: boolean;
  onDeleteImage?: (imageId: string) => void;
}

const Gallery: React.FC<GalleryProps> = ({
  images,
  isLoading,
  error,
  isAdmin = false,
  onDeleteImage,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredImages = images.filter(
    (img) =>
      img.pseudonym.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (img.title?.toLowerCase() || "").includes(searchTerm.toLowerCase()),
  );

  const handleDelete = (e: React.MouseEvent, imageId: string) => {
    e.preventDefault(); // Prevenir la navegación del Link
    onDeleteImage?.(imageId);
  };

  return (
    <section id="gallery" className="py-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Galeria de textos d'opinió
        </h2>

        {/* Barra de búsqueda */}
        <div className="relative max-w-md mx-auto mb-12">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Cercar per pseudònim o títol..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-[#193547] focus:border-transparent"
          />
          {searchTerm && (
            <p className="absolute right-4 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">
              {filteredImages.length} resultado(s)
            </p>
          )}
        </div>

        {/* Estado de error */}
        {error && (
          <div className="flex items-center justify-center gap-2 p-4 mb-6 bg-red-50 text-red-600 rounded-lg">
            <AlertCircle className="h-5 w-5" />
            <p>{error}</p>
          </div>
        )}

        {/* Estado de carga */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12 gap-4">
            <Loader2 className="h-8 w-8 text-[#193547] animate-spin" />
            <p className="text-gray-600">Carregant imatges...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredImages.map((image) => (
              <Link
                key={image.id}
                to={`/photo/${image.id}`}
                className="group relative overflow-hidden rounded-lg shadow-lg bg-white"
              >
                <img
                  src={image.url}
                  alt={image.title || "Imatge de galeria"}
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
                {isAdmin && (
                  <button
                    onClick={(e) => handleDelete(e, image.id)}
                    className="absolute top-2 right-2 p-2 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-600"
                    title="Borrar imagen"
                  >
                    <Trash2 className="h-5 w-5 text-white" />
                  </button>
                )}
              </Link>
            ))}
          </div>
        )}

        {/* Mensaje cuando no hay resultados */}
        {!isLoading && filteredImages.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">
              No s'han trobat imatges que coincideixin amb la cerca.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
