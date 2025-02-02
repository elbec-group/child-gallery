import { useState, useCallback, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useSearchParams,
} from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ImageUpload from "./components/ImageUpload";
import Gallery from "./components/Gallery";
import Footer from "./components/Footer";
import PhotoDetail from "./components/PhotoDetail";
import { AboutSection } from "./components/About";
import { ImageManager } from "./lib/firebase/ImageManager";
import ScrollToTop from "./components/ScrollToTop";

export type ImageItem = {
  id: string;
  url: string;
  pseudonym: string;
  title?: string;
};

// Imágenes de ejemplo como fallback
const SAMPLE_IMAGES: ImageItem[] = [];

function AppContent() {
  const [searchParams] = useSearchParams();
  const isAdmin = searchParams.get("admin") === "true";
  const [images, setImages] = useState<ImageItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const imageManager = new ImageManager(window.app);
        const [error, firebaseImages] = await imageManager.getAllImages();

        if (error) {
          throw error;
        }

        if (firebaseImages) {
          const formattedImages: ImageItem[] = firebaseImages.map((img) => ({
            id: img.id,
            url: img.url || "",
            pseudonym: img.creator || "Anònim",
            title: img.title,
          }));

          // Combinar imágenes de Firebase con las de ejemplo
          setImages([...formattedImages, ...SAMPLE_IMAGES]);
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Error al cargar las imágenes",
        );
        // Cargar imágenes de ejemplo como fallback
        setImages(SAMPLE_IMAGES);
      } finally {
        setIsLoading(false);
      }
    };

    loadImages();
  }, []);

  const handleImageUpload = useCallback((newImage: ImageItem) => {
    setImages((prev) => [newImage, ...prev]);
  }, []);

  const handleImageDelete = useCallback(async (imageId: string) => {
    if (
      !window.confirm(
        "¿Estás seguro de que quieres borrar esta imagen? Esta acción no se puede deshacer.",
      )
    ) {
      return;
    }

    try {
      const imageManager = new ImageManager(window.app);
      const [error] = await imageManager.deleteImage(imageId);

      if (error) {
        throw error;
      }

      setImages((prev) => prev.filter((img) => img.id !== imageId));
      window.alert("Imagen borrada correctamente");
    } catch (err) {
      window.alert("Error al borrar la imagen");
      console.error("Error deleting image:", err);
    }
  }, []);

  const HomePage = () => (
    <>
      <Hero />
      <ImageUpload onUpload={handleImageUpload} />
      <Gallery
        images={images}
        isLoading={isLoading}
        error={error}
        isAdmin={isAdmin}
        onDeleteImage={handleImageDelete}
      />
      <AboutSection />
    </>
  );

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto px-4 pt-20">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/photo/:id"
            element={
              <PhotoDetail
                images={images}
                isAdmin={isAdmin}
                onDeleteImage={handleImageDelete}
              />
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}

export default App;
