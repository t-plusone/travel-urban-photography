import React, { useState } from 'react';
import { Camera, Menu, X } from 'lucide-react';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Replace these placeholder URLs with your real photo URLs later
  const heroImage = "https://placehold.co/1920x1080/000000/FFFFFF?text=Your+Hero+Photo";
  const portfolioImage = "https://placehold.co/1200x800/111111/FFFFFF?text=Portfolio+Photo";

  return (
    <div className="font-sans bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 w-full bg-black bg-opacity-70 z-50">
        <div className="max-w-6xl mx-auto px-6 py-6 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-light tracking-wide">CKP</span>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#portfolio" className="font-light text-sm hover:opacity-70 transition-opacity">Portfolio</a>
            <a href="#about" className="font-light text-sm hover:opacity-70 transition-opacity">About</a>
            <a href="#contact" className="font-light text-sm hover:opacity-70 transition-opacity">Contact</a>
          </nav>

          {/* Mobile menu */}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 px-6">
            <nav className="flex flex-col space-y-3">
              <a href="#portfolio" className="font-light text-sm hover:opacity-70" onClick={() => setIsMenuOpen(false)}>Portfolio</a>
              <a href="#about" className="font-light text-sm hover:opacity-70" onClick={() => setIsMenuOpen(false)}>About</a>
              <a href="#contact" className="font-light text-sm hover:opacity-70" onClick={() => setIsMenuOpen(false)}>Contact</a>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section - Full Screen */}
      <section className="min-h-screen flex flex-col items-center justify-center relative">
        <img 
          src={heroImage} 
          alt="Charley Knox Photography"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-10 text-center px-6">
          <h1 className="text-5xl md:text-7xl font-light mb-4 tracking-wide">Charley Knox</h1>
          <p className="text-xl md:text-2xl font-light tracking-wide">PHOTOGRAPHY</p>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 bg-black">
        <div className="max-w-6xl mx-auto px-6">
          <img 
            src={portfolioImage} 
            alt="Portfolio"
            className="w-full h-auto"
          />
        </div>
      </section>

      {/* About & Contact - Minimal */}
      <section id="about" className="h-40 bg-black"></section>
      <section id="contact" className="h-40 bg-black"></section>

      {/* Footer */}
      <footer className="py-8 bg-black text-center text-white/50 text-sm">
        <p>CKP</p>
      </footer>
    </div>
  );
};

export default App;