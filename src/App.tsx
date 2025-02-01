import { useState, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ImageUpload from "./components/ImageUpload";
import Gallery from "./components/Gallery";
import Footer from "./components/Footer";
import PhotoDetail from "./components/PhotoDetail";
import { AboutSection } from "./components/About";

export type ImageItem = {
  id: string;
  url: string;
  pseudonym: string;
  title?: string;
};

function App() {
  const [images, setImages] = useState<ImageItem[]>([
    {
      id: "1",
      url: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9",
      pseudonym: "ArtisticKid",
      title: "My First Photo",
    },
    {
      id: "2",
      url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c",
      pseudonym: "LittleExplorer",
      title: "Nature Adventure",
    },
    {
      id: "3",
      url: "https://images.unsplash.com/photo-1472162072942-cd5147eb3902",
      pseudonym: "CreativeSpirit",
      title: "Colors of Life",
    },
    {
      id: "4",
      url: "https://images.unsplash.com/photo-1516627145497-ae6968895b74",
      pseudonym: "NatureLover",
      title: "Butterfly Dreams",
    },
    {
      id: "5",
      url: "https://images.unsplash.com/photo-1464535343673-14c68fd228c7",
      pseudonym: "TinyPhotographer",
      title: "Morning Light",
    },
    {
      id: "6",
      url: "https://images.unsplash.com/photo-1490718720478-364a07a997cd",
      pseudonym: "AdventureSeeker",
      title: "Beach Sunset",
    },
    {
      id: "7",
      url: "https://images.unsplash.com/photo-1496275068113-fff8c90750d1",
      pseudonym: "DreamCatcher",
      title: "Garden Magic",
    },
    {
      id: "8",
      url: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e",
      pseudonym: "SkyWatcher",
      title: "Cloud Patterns",
    },
    {
      id: "9",
      url: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94",
      pseudonym: "ColorHunter",
      title: "Sunrise Wonder",
    },
    {
      id: "10",
      url: "https://images.unsplash.com/photo-1501426026826-31c667bdf23d",
      pseudonym: "FlowerChild",
      title: "Summer Blooms",
    },
    {
      id: "11",
      url: "https://images.unsplash.com/photo-1496449903678-68ddcb189a24",
      pseudonym: "PetLover",
      title: "My Best Friend",
    },
    {
      id: "12",
      url: "https://images.unsplash.com/photo-1502082553048-f009c37129b9",
      pseudonym: "TreeHugger",
      title: "Forest Magic",
    },
    {
      id: "13",
      url: "https://images.unsplash.com/photo-1500531279542-fc8490c8ea4d",
      pseudonym: "BeachComber",
      title: "Ocean Waves",
    },
    {
      id: "14",
      url: "https://images.unsplash.com/photo-1493707553966-283afac8c358",
      pseudonym: "GardenGuru",
      title: "Spring Colors",
    },
    {
      id: "15",
      url: "https://images.unsplash.com/photo-1462275646964-a0e3386b89fa",
      pseudonym: "ButterflyWhisperer",
      title: "Wings of Wonder",
    },
  ]);

  const handleImageUpload = useCallback((newImage: ImageItem) => {
    setImages((prev) => [newImage, ...prev]);
  }, []);

  const HomePage = () => (
    <>
      <Hero />
      <ImageUpload onUpload={handleImageUpload} />
      <Gallery images={images} />
      <AboutSection />
    </>
  );

  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Header />
        <main className="container mx-auto px-4 pt-20">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/photo/:id"
              element={<PhotoDetail images={images} />}
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

