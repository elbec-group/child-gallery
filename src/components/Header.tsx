import React, { useState, useEffect } from "react";
import { Camera } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    const aboutSection = document.getElementById("about");
    aboutSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/80 backdrop-blur-lg shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Camera className="h-8 w-8 text-[#193547]" />
            <span className="text-xl font-bold bg-gradient-to-r from-[#193547] to-[#193547] bg-clip-text text-transparent">
              TextosOpinio
            </span>
          </div>

          <nav className="flex">
            <button
              onClick={handleClick}
              className="text-gray-600 hover:text-[#193547] transition-colors duration-200 font-medium"
            >
              Sobre aquesta pàgina
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

