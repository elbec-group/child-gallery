import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, User, Calendar } from "lucide-react";
import type { ImageItem } from "../App";

interface PhotoDetailProps {
  images: ImageItem[];
}

const PhotoDetail: React.FC<PhotoDetailProps> = ({ images }) => {
  const { id } = useParams();
  const image = images.find((img) => img.id === id);

  if (!image) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Foto no encontrada
          </h2>
          <Link
            to="/"
            className="inline-flex items-center text-[#193547] hover:text-purple-700"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Volver a la galería
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        to="/"
        className="inline-flex items-center text-[#193547] hover:text-purple-700 mb-8"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Volver a la galería
      </Link>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative">
          <img
            src={image.url}
            alt={image.title || "Imagen de galería"}
            className="w-full h-[70vh] object-contain bg-black"
          />
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {image.title || "Sin título"}
              </h1>
              <div className="flex items-center text-gray-600">
                <User className="h-5 w-5 mr-2" />
                <span className="font-medium">{image.pseudonym}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Más fotos de la galería
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {images
                .filter((img) => img.id !== image.id)
                .slice(0, 5)
                .map((img) => (
                  <Link
                    key={img.id}
                    to={`/photo/${img.id}`}
                    className="block group"
                  >
                    <div className="aspect-square overflow-hidden rounded-lg">
                      <img
                        src={img.url}
                        alt={img.title || "Imagen de galería"}
                        className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoDetail;

