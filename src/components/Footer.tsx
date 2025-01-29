import React from 'react';
import { Camera, Heart, Shield } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white/80 backdrop-blur-lg border-t border-gray-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Camera className="h-6 w-6 text-purple-600" />
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                KidsGallery
              </span>
            </div>
            <p className="text-gray-600">
              Un espacio seguro para que los niños compartan su creatividad
              a través de la fotografía.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-gray-600 hover:text-purple-600">
                  Inicio
                </a>
              </li>
              <li>
                <a href="#upload" className="text-gray-600 hover:text-purple-600">
                  Subir Foto
                </a>
              </li>
              <li>
                <a href="#gallery" className="text-gray-600 hover:text-purple-600">
                  Galería
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-600 hover:text-purple-600">
                  Sobre Nosotros
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Seguridad</h3>
            <div className="flex items-center space-x-2 text-gray-600 mb-2">
              <Shield className="h-5 w-5" />
              <span>Entorno Seguro para Niños</span>
            </div>
            <p className="text-gray-600 text-sm">
              Nos tomamos muy en serio la seguridad de los niños. Todas las
              imágenes son moderadas y los datos personales están protegidos.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm">
              © 2024 KidsGallery. Todos los derechos reservados.
            </p>
            <div className="flex items-center space-x-1 text-gray-600 text-sm mt-4 md:mt-0">
              Hecho con <Heart className="h-4 w-4 text-red-500" /> para pequeños artistas
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;