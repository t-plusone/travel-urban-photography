import React, { useState, useEffect } from 'react';
import { Camera, MapPin, Mail, Menu, X, ArrowLeft, ArrowRight, Download, Share2, Heart } from 'lucide-react';

const App = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Your photography data
  const photos = [
    {
      id: 1,
      title: "Tokyo Nights",
      location: "Tokyo, Japan",
      image: "https://placehold.co/800x1000/1a1a1a/FFFFFF?text=Tokyo+Nights",
      likes: 142
    },
    {
      id: 2,
      title: "Santorini Dawn",
      location: "Santorini, Greece",
      image: "https://placehold.co/800x1000/2d2d2d/FFFFFF?text=Santorini+Dawn",
      likes: 189
    },
    {
      id: 3,
      title: "New York Geometry",
      location: "New York, USA",
      image: "https://placehold.co/800x1000/111111/FFFFFF?text=NYC+Geometry",
      likes: 167
    },
    {
      id: 4,
      title: "Patagonia Wilderness",
      location: "Chile",
      image: "https://placehold.co/800x1000/252525/FFFFFF?text=Patagonia",
      likes: 203
    },
    {
      id: 5,
      title: "Barcelona Architecture",
      location: "Spain",
      image: "https://placehold.co/800x1000/1e1e1e/FFFFFF?text=Barcelona",
      likes: 176
    },
    {
      id: 6,
      title: "Kyoto Temples",
      location: "Japan",
      image: "https://placehold.co/800x1000/151515/FFFFFF?text=Kyoto",
      likes: 155
    }
  ];

  const featuredPhotos = [photos[0], photos[1], photos[2]];
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredPhotos.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredPhotos.length) % featuredPhotos.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  const openLightbox = (photo) => {
    setSelectedImage(photo);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateLightbox = (direction) => {
    const currentIndex = photos.findIndex(p => p.id === selectedImage.id);
    let newIndex;
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % photos.length;
    } else {
      newIndex = (currentIndex - 1 + photos.length) % photos.length;
    }
    setSelectedImage(photos[newIndex]);
  };

  return (
    <div className="font-sans bg-white text-black">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white bg-opacity-90 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Camera className="h-5 w-5" />
            <span className="text-lg font-light tracking-wide">Charley Knox</span>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#portfolio" className="font-light text-sm hover:text-gray-600 transition-colors">Portfolio</a>
            <a href="#about" className="font-light text-sm hover:text-gray-600 transition-colors">About</a>
            <a href="#contact" className="font-light text-sm hover:text-gray-600 transition-colors">Contact</a>
          </nav>

          {/* Mobile menu button */}
          <button 
            className="md:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 px-6 border-t border-gray-100">
            <nav className="flex flex-col space-y-3">
              <a href="#portfolio" className="font-light text-sm hover:text-gray-600" onClick={() => setIsMenuOpen(false)}>Portfolio</a>
              <a href="#about" className="font-light text-sm hover:text-gray-600" onClick={() => setIsMenuOpen(false)}>About</a>
              <a href="#contact" className="font-light text-sm hover:text-gray-600" onClick={() => setIsMenuOpen(false)}>Contact</a>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative">
        <div className="absolute inset-0 bg-black">
          <img 
            src={featuredPhotos[currentSlide].image} 
            alt={featuredPhotos[currentSlide].title}
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        
        <div className="relative z-10 text-center text-white px-6">
          <h1 className="text-5xl md:text-7xl font-light mb-4 tracking-tight">Charley Knox</h1>
          <p className="text-xl md:text-2xl font-light tracking-wide">Travel Photography</p>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {featuredPhotos.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {photos.map((photo) => (
              <div 
                key={photo.id}
                className="group cursor-pointer"
                onClick={() => openLightbox(photo)}
              >
                <div className="relative overflow-hidden mb-4">
                  <img 
                    src={photo.image} 
                    alt={photo.title}
                    className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                </div>
                <h3 className="font-light text-lg mb-1">{photo.title}</h3>
                <div className="flex items-center text-gray-600 text-sm">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{photo.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-light mb-8 tracking-wide">About</h2>
          <p className="text-gray-700 leading-relaxed max-w-2xl mx-auto font-light">
            I'm Charley Knox, a travel photographer capturing the world's most inspiring 
            urban landscapes, architectural wonders, and natural beauty. My work explores 
            the intersection of human creation and the natural world across continents.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-light mb-8 tracking-wide">Contact</h2>
          <div className="space-y-6">
            <div className="flex items-center justify-center space-x-3 text-gray-700">
              <Mail className="h-5 w-5" />
              <span>charley@travelphotography.com</span>
            </div>
            <p className="text-gray-600 font-light">
              Available for commissions and travel assignments worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-black text-white text-center">
        <p className="text-sm font-light">© 2024 Charley Knox Photography. All rights reserved.</p>
      </footer>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-6xl max-h-full">
            <button 
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white hover:text-gray-300 z-10"
            >
              <X className="h-8 w-8" />
            </button>
            
            <button 
              onClick={() => navigateLightbox('prev')}
              className="absolute left-6 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
            >
              <ArrowLeft className="h-8 w-8" />
            </button>
            
            <button 
              onClick={() => navigateLightbox('next')}
              className="absolute right-6 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
            >
              <ArrowRight className="h-8 w-8" />
            </button>
            
            <img 
              src={selectedImage.image} 
              alt={selectedImage.title}
              className="max-h-[80vh] max-w-full object-contain"
            />
            
            <div className="absolute bottom-6 left-6 right-6 text-white p-4">
              <h3 className="text-xl font-light mb-1">{selectedImage.title}</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm">
                  <span className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {selectedImage.location}
                  </span>
                  <span className="flex items-center">
                    <Heart className="h-4 w-4 mr-1 text-red-400" />
                    {selectedImage.likes}
                  </span>
                </div>
                <div className="flex space-x-3">
                  <button className="flex items-center space-x-1 bg-white bg-opacity-10 hover:bg-opacity-20 px-3 py-1.5 rounded text-sm">
                    <Download className="h-4 w-4" />
                    <span>Download</span>
                  </button>
                  <button className="flex items-center space-x-1 bg-white bg-opacity-10 hover:bg-opacity-20 px-3 py-1.5 rounded text-sm">
                    <Share2 className="h-4 w-4" />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;