// ============================================================================
// IMPORTS
// ============================================================================

// React & Core
import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';

// Leaflet
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// ============================================================================
// GLOBAL STYLES & LEAFLET FIXES
// ============================================================================

const GlobalStyles = () => (
  <style>
    {`
      html {
        overflow-y: scroll !important;
      }
      body {
        margin: 0;
        padding: 0;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      }
    `}
  </style>
);

// Fix Leaflet default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// ============================================================================
// PROJECT DATA
// ============================================================================

const projectData = {
  'sg-urbanscape': {
    title: 'singapore urbanscape',
    type: 'Urban Landscape',
    location: 'Singapore',
    description: [
      'Exploring the dynamic urban architecture and cityscapes of Singapore, capturing the interplay between modern development and natural elements.',
      'This series examines how Singapore blends futuristic architecture with lush greenery, creating a unique urban environment that feels both technologically advanced and naturally harmonious.'
    ],
    images: [
      {
        src: 'https://github.com/t-plusone/plus.one-photos/blob/main/IMG_0365.jpg?raw=true',
        caption: 'Spiral',
        metadata: [
          'Published in the 2005 photo-book \'To Singapore with Love\' as part of the nation\'s 40th National Day tribute.',
          'Shot on Canon EOS 20D'
        ]
      },
      {
        src: 'https://github.com/t-plusone/plus.one-photos/blob/main/_DSF4459.jpg?raw=true',
        caption: 'Inspired by MC Escher',
        metadata: [
          'Were the town planners in Singapore inspired by MC Escher when they designed the town of Toa Payoh back in the 1960s? I doubt they were, but one will never know. Millions of Singaporeans live in government-built apartments within these blocks of \'HDB flats\'. (HDB, or Housing Development Board of Singapore, is the government department that build and manage these apartments.) \'HDB flats\' has become a symbol of Singapore, loved by their inhabitants and providing a blueprint to many other countries in the world for the development of their own public housing. These \'public housing\' estates in Singapore are safe, clean and often spacious and well constructed internally - a far cry from the slums or ghettos associated with \'public housing\' in other countries.',
          'Location: Toa Payoh, Singapore',
          'Awarded \'Honorable Mention\' in Chromatic Awards 2023'
        ]
      }
    ]
  },
  'sychedelic': {
    title: 'sychedelic southerncross station',
    type: 'one-shoot photo documentary',
    location: 'Melbourne, Australia',
    description: [
      'Shot during the electric haze of an early winter evening rush hour, this series transforms Melbourne\'s Southern Cross Station into a radiant, kinetic dreamscape. From soaring vantage points to ground-level chaos, each frame pulses with motion: commuters dissolve into streaks of color, trains blaze as neon comets, and the station\'s iconic ribbed roof glows like a molten canopy over the throng below.',
      'Artificial light fractures through glass and steel, painting the scene in prisms of electric blue, amber, and spectral green. The air hums—not with steam, but with the visible energy of movement: footsteps, arrivals, departures, all rendered as liquid trails of light and shadow. Even stillness feels charged; waiting figures hover like ghosts caught between destinations.',
      'This is not documentation—it\'s transmutation. A fleeting window of urban flux, stretched and amplified, where architecture bends to the rhythm of human flow, and every reflection shimmers with the pulse of the city at its most alive.'
    ],
    images: [
      {
        src: 'https://github.com/t-plusone/plus.one-photos/blob/main/_DSF5918.jpg?raw=true',
        caption: 'Undulating roof structure',
        metadata: [
          'Winner: Australian Architecture Awards 2023',
          'Featured in Dezeen Architecture'
        ]
      },
      {
        src: 'https://github.com/t-plusone/plus.one-photos/blob/main/_DSF5922.jpg?raw=true',
        caption: 'Interior light play',
        metadata: [
          'Exhibited at Melbourne Photography Festival',
          'Shot during golden hour'
        ]
      },
      {
        src: 'https://github.com/t-plusone/plus.one-photos/blob/main/_DSF5939.jpg?raw=true',
        caption: 'Colorful terminal entrance',
        metadata: [
          'Limited edition of 25 prints',
          'Acquired by State Library Victoria'
        ]
      },
      {
        src: 'https://github.com/t-plusone/plus.one-photos/blob/main/_DSF5942.jpg?raw=true',
        caption: 'Undulating roof structure',
        metadata: [
          'Winner: Australian Architecture Awards 2023',
          'Featured in Dezeen Architecture'
        ]
      },
      {
        src: 'https://github.com/t-plusone/plus.one-photos/blob/main/_DSF5947.jpg?raw=true',
        caption: 'Undulating roof structure',
        metadata: [
          'Winner: Australian Architecture Awards 2023',
          'Featured in Dezeen Architecture'
        ]
      },
      {
        src: 'https://github.com/t-plusone/plus.one-photos/blob/main/_DSF5953.jpg?raw=true',
        caption: 'Undulating roof structure',
        metadata: [
          'Winner: Australian Architecture Awards 2023',
          'Featured in Dezeen Architecture'
        ]
      },
      {
        src: 'https://github.com/t-plusone/plus.one-photos/blob/main/_DSF5951.jpg?raw=true',
        caption: 'Undulating roof structure',
        metadata: [
          'Winner: Australian Architecture Awards 2023',
          'Featured in Dezeen Architecture'
        ]
      }
    ]
  }
};

// ============================================================================
// LIGHTBOX COMPONENT (MOBILE-OPTIMIZED)
// ============================================================================

function Lightbox({ isOpen, onClose, image, caption, metadata }) {
  if (!isOpen) return null;

  const isMobile = window.innerWidth <= 768;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10px',
        overflow: 'auto'
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          overflow: 'hidden',
          position: 'relative',
          maxWidth: isMobile ? '95vw' : '1200px',
          maxHeight: '95vh',
          width: '100%',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            fontSize: '18px',
            cursor: 'pointer'
          }}
        >
          ×
        </button>

        <div
          style={{
            width: '100%',
            padding: isMobile ? '16px' : '20px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            ...(isMobile ? {} : { flex: 2, minWidth: '400px' })
          }}
        >
          <img
            src={image}
            alt={caption}
            style={{
              maxWidth: '100%',
              maxHeight: '70vh',
              height: 'auto',
              objectFit: 'contain',
              borderRadius: '4px'
            }}
          />
        </div>

        <div
          style={{
            width: '100%',
            padding: isMobile ? '0 16px 16px' : '20px',
            ...(isMobile ? {} : { flex: 1, minWidth: '300px', overflowY: 'auto' })
          }}
        >
          <h3
            style={{
              fontSize: isMobile ? '1rem' : '1.2rem',
              fontWeight: 500,
              marginBottom: '12px',
              color: '#1a1a1a'
            }}
          >
            {caption}
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {metadata.map((item, index) => (
              <div
                key={index}
                style={{
                  padding: '8px 12px',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '4px',
                  fontSize: isMobile ? '0.85rem' : '0.9rem',
                  color: '#495057',
                  lineHeight: 1.4
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// UI COMPONENTS (HEADER, NAVIGATION, LOGO)
// ============================================================================

function Logo({ isHome = false, darkMode = false }) {
  const logoWhite = 'https://raw.githubusercontent.com/t-plusone/plus.one-photos/main/plusone_logo_white.png';
  const logoBlack = 'https://raw.githubusercontent.com/t-plusone/plus.one-photos/main/plusone_logo_black.png';
  const logoUrl = isHome ? logoWhite : (darkMode ? logoWhite : logoBlack);

  return (
    <Link to="/">
      <img
        src={logoUrl}
        alt="plus.one"
        style={{ width: '130px', height: '60px', objectFit: 'contain' }}
        onError={(e) => {
          console.error('Failed to load logo:', logoUrl);
          e.target.style.opacity = 0.5;
        }}
      />
    </Link>
  );
}

function Navigation({ isHome, darkMode = false }) {
  const color = isHome ? 'white' : (darkMode ? 'white' : '#1a1a1a');

  return (
    <nav className="desktop-menu">
      <Link
        to="/portfolio"
        style={{
          marginLeft: '32px',
          textDecoration: 'none',
          color,
          opacity: 0.9,
          fontSize: '0.95rem',
          fontWeight: 400
        }}
      >
        portfolio
      </Link>
      <Link
        to="/photo-documentaries"
        style={{
          marginLeft: '32px',
          textDecoration: 'none',
          color,
          opacity: 0.9,
          fontSize: '0.95rem',
          fontWeight: 400
        }}
      >
        photo documentaries
      </Link>
      <Link
        to="/about"
        style={{
          marginLeft: '32px',
          textDecoration: 'none',
          color,
          opacity: 0.9,
          fontSize: '0.95rem',
          fontWeight: 400
        }}
      >
        about
      </Link>
      <Link
        to="/contact"
        style={{
          marginLeft: '32px',
          textDecoration: 'none',
          color,
          opacity: 0.9,
          fontSize: '0.95rem',
          fontWeight: 400
        }}
      >
        contact
      </Link>
    </nav>
  );
}

function MobileMenu({ isHome, darkMode = false, isOpen, onClose }) {
  const color = isHome ? 'white' : (darkMode ? 'white' : '#1a1a1a');
  const bgColor = isHome ? 'rgba(0,0,0,0.9)' : (darkMode ? '#000' : '#fff');

  if (!isOpen) return null;

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.4)',
          zIndex: 999
        }}
      />
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          height: '100vh',
          width: '280px',
          backgroundColor: bgColor,
          color,
          zIndex: 1000,
          padding: '24px 32px',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <button
          onClick={onClose}
          aria-label="Close menu"
          style={{
            background: 'none',
            border: 'none',
            color,
            fontSize: '24px',
            marginLeft: 'auto',
            cursor: 'pointer'
          }}
        >
          ✕
        </button>
        <nav style={{ marginTop: '40px' }}>
          <div style={{ marginBottom: '20px' }}>
            <Link
              to="/portfolio"
              style={{ color, textDecoration: 'none', fontSize: '1.1rem' }}
              onClick={onClose}
            >
              portfolio
            </Link>
          </div>
          <div style={{ marginBottom: '20px' }}>
            <Link
              to="/photo-documentaries"
              style={{ color, textDecoration: 'none', fontSize: '1.1rem' }}
              onClick={onClose}
            >
              photo documentaries
            </Link>
          </div>
          <div style={{ marginBottom: '20px' }}>
            <Link
              to="/about"
              style={{ color, textDecoration: 'none', fontSize: '1.1rem' }}
              onClick={onClose}
            >
              about
            </Link>
          </div>
          <div>
            <Link
              to="/contact"
              style={{ color, textDecoration: 'none', fontSize: '1.1rem' }}
              onClick={onClose}
            >
              contact
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}

function Header({ isHome, darkMode = false }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerBg = isHome ? 'rgba(0, 0, 0, 0.40)' : 'transparent';
  const buttonColor = isHome ? 'white' : (darkMode ? 'white' : '#1a1a1a');

  return (
    <header
      style={{
        padding: '24px 32px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
        zIndex: 10,
        backgroundColor: headerBg
      }}
    >
      <div>
        <Logo isHome={isHome} darkMode={darkMode} />
      </div>
      <Navigation isHome={isHome} darkMode={darkMode} />
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          background: 'none',
          border: 'none',
          color: buttonColor,
          fontSize: '24px',
          display: 'none'
        }}
        className="mobile-menu-button"
      >
        ☰
      </button>
      <MobileMenu
        isHome={isHome}
        darkMode={darkMode}
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
      />
      <style jsx>{`
        @media (max-width: 768px) {
          .desktop-menu {
            display: none !important;
          }
          .mobile-menu-button {
            display: block !important;
          }
        }
      `}</style>
    </header>
  );
}

// ============================================================================
// PAGE COMPONENTS
// ============================================================================

// ---------------- HOME PAGE ----------------
function HomePage() {
  const isMobile = window.innerWidth <= 768;
  const desktopHero = 'https://github.com/t-plusone/plus.one-photos/blob/main/PA031063.JPG?raw=true';
  const mobileHero = 'https://raw.githubusercontent.com/t-plusone/plus.one-photos/main/PA031063m.JPG';
  const heroImage = isMobile ? mobileHero : desktopHero;

  return (
    <div
      style={{
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        margin: 0,
        overflowX: 'hidden'
      }}
    >
      <div
        style={{
          minHeight: '100vh',
          width: '100%',
          backgroundImage: `url(${heroImage.trim()})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative'
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.10)'
          }}
        />
        <Header isHome={true} />
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            padding: '0 20px',
            color: 'white',
            position: 'relative',
            zIndex: 5
          }}
        >
          <h1
            style={{
              fontSize: 'clamp(2rem, 8vw, 3rem)',
              fontWeight: 300,
              marginBottom: '1rem',
              letterSpacing: '0.05em',
              lineHeight: 1.2,
              textShadow: '2px 2px 4px rgba(0,0,0,0.9)'
            }}
          >
            <span style={{ color: 'white' }}>plus</span>
            <span style={{ color: '#bbb' }}>one</span>
          </h1>
          <p
            style={{
              fontSize: 'clamp(1rem, 5vw, 1.5rem)',
              fontWeight: 300,
              letterSpacing: '0.2em',
              lineHeight: 1.2,
              textShadow: '2px 2px 4px rgba(0,0,0,0.9)',
              color: 'white'
            }}
          >
            travel & urbanscape photographer
          </p>
        </div>
      </div>
    </div>
  );
}

// ---------------- PORTFOLIO PAGE ----------------
function PortfolioPage() {
  const projects = [
    {
      id: 'sg-urbanscape',
      title: 'singapore urbanscape',
      image: 'https://github.com/t-plusone/plus.one-photos/blob/main/IMG_0365.jpg?raw=true'
    },
    {
      id: 'sychedelic',
      title: 'sychedelic southerncross station',
      image: 'https://github.com/t-plusone/plus.one-photos/blob/main/_DSF5939.jpg?raw=true'
    }
  ];

  return (
    <div
      style={{
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        backgroundColor: 'white',
        color: '#1a1a1a',
        minHeight: '100vh',
        width: '100%'
      }}
    >
      <Header isHome={false} />
      <div
        style={{
          padding: '60px 32px 40px',
          maxWidth: '1500px',
          margin: '0 auto',
          width: '100%',
          boxSizing: 'border-box'
        }}
      >
        <h1
          style={{
            fontSize: '2.5rem',
            fontWeight: 400,
            textAlign: 'center',
            marginBottom: '40px',
            letterSpacing: '0.02em'
          }}
        >
          portfolio
        </h1>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '24px',
            width: '100%'
          }}
        >
          {projects.map((project, index) => (
            <Link
              key={index}
              to={`/portfolio-collections/my-portfolio/${project.id}`}
              style={{ display: 'block', textDecoration: 'none', width: '100%' }}
            >
              <img
                src={project.image.trim()}
                alt={project.title}
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  borderRadius: '4px'
                }}
                onContextMenu={(e) => e.preventDefault()}
              />
              <div
                style={{
                  textAlign: 'center',
                  fontSize: '0.95rem',
                  fontWeight: 400,
                  marginTop: '12px',
                  color: '#1a1a1a'
                }}
              >
                {project.title}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
// ---------------- PHOTO DOCUMENTARIES INDEX PAGE ----------------
function PhotoDocumentariesPage() {
  const documentaries = [
    {
      slug: 'a-stroll-down-memory-lane',
      title: 'A Stroll Down Memory Lane',
      subtitle: 'Awarded 1st Prize, "Changing Landscape of Singapore" Photography Competition, 2009, organized by National Library Board, Singapore',
      coverImage: 'https://github.com/t-plusone/plus.one-photos/blob/main/tp-cover.jpg?raw=true'
    },
    {
      slug: 'a-journey-till-the-end',
      title: 'A Journey Till The End',
      subtitle: 'The KTM Railway Story',
      coverImage: 'https://github.com/t-plusone/plus.one-photos/blob/main/P8010338.jpg?raw=true'
    }
  ];

  return (
    <div
      style={{
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        backgroundColor: '#000',
        minHeight: '100vh',
        color: '#fff',
        width: '100%'
      }}
    >
      <Header isHome={false} darkMode={true} />
      <div
        style={{
          padding: '60px 32px 40px',
          maxWidth: '1500px',
          margin: '0 auto',
          width: '100%',
          boxSizing: 'border-box'
        }}
      >
        <h1
          style={{
            fontSize: '2.5rem',
            fontWeight: 400,
            textAlign: 'center',
            marginBottom: '40px',
            letterSpacing: '0.02em'
          }}
        >
          photo documentaries
        </h1>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '24px',
            width: '100%'
          }}
        >
          {documentaries.map((doc, index) => {
            // Toa Payoh: Static "Work in Progress" card (non-clickable)
            if (doc.slug === 'a-stroll-down-memory-lane') {
              return (
                <div
                  key={index}
                  style={{
                    width: '100%',
                    opacity: 0.7,
                    cursor: 'not-allowed'
                  }}
                >
                  <div style={{ position: 'relative' }}>
                    <img
                      src={doc.coverImage.trim()}
                      alt={doc.title}
                      style={{
                        width: '100%',
                        height: 'auto',
                        aspectRatio: '16 / 10',
                        objectFit: 'cover',
                        borderRadius: '4px',
                        display: 'block',
                        filter: 'grayscale(30%)'
                      }}
                      onContextMenu={(e) => e.preventDefault()}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        background: 'rgba(255, 204, 0, 0.9)',
                        color: '#000',
                        padding: '4px 10px',
                        borderRadius: '12px',
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        letterSpacing: '0.5px',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
                      }}
                    >
                      WORK IN PROGRESS
                    </div>
                  </div>
                  <div
                    style={{
                      textAlign: 'center',
                      fontSize: '0.95rem',
                      fontWeight: 400,
                      marginTop: '12px',
                      color: '#aaa'
                    }}
                  >
                    {doc.title}
                  </div>
                  <div
                    style={{
                      textAlign: 'center',
                      fontSize: '0.85rem',
                      color: '#666',
                      marginTop: '4px',
                      fontStyle: 'italic'
                    }}
                  >
                    Launching soon
                  </div>
                </div>
              );
            }
            
            // KTM: Fully functional link with subtle hover animation
            return (
              <Link
                key={index}
                to={`/photo-documentaries/${doc.slug}`}
                style={{ display: 'block', textDecoration: 'none', width: '100%' }}
              >
                <img
                  src={doc.coverImage.trim()}
                  alt={doc.title}
                  style={{
                    width: '100%',
                    height: 'auto',
                    aspectRatio: '16 / 10',
                    objectFit: 'cover',
                    borderRadius: '4px',
                    display: 'block',
                    transition: 'transform 0.2s, box-shadow 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  onContextMenu={(e) => e.preventDefault()}
                />
                <div
                  style={{
                    textAlign: 'center',
                    fontSize: '0.95rem',
                    fontWeight: 400,
                    marginTop: '12px',
                    color: '#fff'
                  }}
                >
                  {doc.title}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
// ---------------- KTM STORY MAP PAGE ----------------
function KtmStoryMapPage() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [lightboxPhoto, setLightboxPhoto] = useState(null);
  const [epilogueOpen, setEpilogueOpen] = useState(false);
  const mapRef = useRef();

  const openLightbox = (photo) => setLightboxPhoto(photo);
  const closeLightbox = () => setLightboxPhoto(null);

useEffect(() => {
  if (selectedLocation) {
    console.log('Selected location ID:', selectedLocation.id, 'Name:', selectedLocation.name);
  }
}, [selectedLocation]);

  // Helper: Format date for captions
  function formatDate(isoDate) {
    if (!isoDate) return '';
    const date = new Date(isoDate);
    if (isNaN(date.getTime())) return '';
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }

  // Helper: Render italics from *asterisks*
  function renderItalic(text) {
    if (!text || typeof text !== 'string') return text;
    const parts = text.split('*');
    if (parts.length <= 1) return text;
    return parts.map((part, index) => {
      if (index % 2 === 1) {
        return <em key={index} style={{ fontStyle: 'italic' }}>{part}</em>;
      }
      return part;
    });
  }

  // Helper: Create numbered marker icons
  function createNumberedIcon(id) {
    return L.divIcon({
      className: 'numbered-marker',
      html: `<div style="
        background: #000;
        color: #fff;
        border-radius: 50%;
        width: 24px;
        height: 24px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 12px;
        font-weight: bold;
        box-shadow: 0 2px 6px rgba(255,255,255,0.4);
        border: 2px solid #fff;
        position: relative;
      ">${id}</div>`,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
      riseOnHover: false
    });
  }

  // KTM Locations Data
    const ktmLocations = [
    {
      id: 1,
      name: "Entrance of the Tanjong Pagar Railway Station",
      lat: 1.2730275,
      lng: 103.8389164,
      photos: [
        {
          id: 1,
          title: "",
          shotFrom: "",
          shotDate: "2011-02-09",
          caption: "",
          imageUrl: "https://github.com/t-plusone/plus.one-photos/blob/main/P2090545.jpg?raw=true"
        },
        {
          id: 2,
          title: "Tanjong Pagar Railway Station",
          shotFrom: "from the carpark of the Station",
          shotDate: "2010-10-09",
          caption: "Built in 1932, the Tanjong Pagar Railway Station was the showpiece of the KTM's Singapore operations and is located along Keppel Road.",
          imageUrl: "https://github.com/t-plusone/plus.one-photos/blob/main/PA091165.jpg?raw=true"
        },
        {
          id: 3,
          title: "F.M.S.R.",
          shotFrom: "",
          shotDate: "",
          caption: [
            "The acronym \"F.M.S.R.\" can be found in several places at the Railway Station.  It stands for \"Federal Malay States Railway\".",
            "It refers to the railway system operating in British Malaya. An example where F.M.S.R. can be found is above the 4 towering statues at the entrance of the Railway Station.",
            "These 4 statues are named Agriculture, Commerce, Transport and Industry - Malaya's economic pillars - each personification holding symbols unique to their domain."
          ],
          imageUrl: "https://github.com/t-plusone/plus.one-photos/blob/main/013.jpg?raw=true",
          isComposite: true
        }
      ]
    },
    {
      id: 2,
      name: "North side of the Tanjong Pagar Railway Station",
      lat: 1.2733707,
      lng: 103.8386348,
      photos: [
        {
          id: 1,
          title: "A simple fencing",
          shotFrom: "",
          shotDate: "2010-11-18",
          caption: [
            "On the north side of the station, a side entrance from Spottiswoode Park Road leads into the compound. The fencing here is unadorned — a quiet contrast to the grandeur of the main façade."

          ],
          imageUrl: "https://github.com/t-plusone/plus.one-photos/blob/main/PB180854.jpg?raw=true"
        },
        {
          id: 2,
          title: "Bambai Food Catering",
          shotFrom: "",
          shotDate: "2010-06-24",
          caption: "On the north side of the Station, there are several entrances that lead, via eating places or corridors, into the main hall of the Station.",
          imageUrl: "https://github.com/t-plusone/plus.one-photos/blob/main/P6240088.jpg?raw=true"
        },
        {
          id: 3,
          title: "One of the entrances into the Station",
          shotFrom: "",
          shotDate: "2010-11-18",
          caption: "",
          imageUrl: "https://github.com/t-plusone/plus.one-photos/blob/main/PB180856.jpg?raw=true"
        },
        {
          id: 4,
          title: "Motorbikes Galore",
          shotFrom: "",
          shotDate: "2010-11-18",
          caption: "Many motorbikes are parked on this side of the Station, likely belonging to people working in the Station.",
          imageUrl: "https://github.com/t-plusone/plus.one-photos/blob/main/PB180858.jpg?raw=true"
        }
      ]
    },
    {
      id: 3,
      name: "South side of the Tanjong Pagar Railway Station",
      lat: 1.2726349,
      lng: 103.8383263,
      photos: [
        {
          id: 1,
          title: "*Kiriman Ekspres*",
          shotFrom: "along Keppel Road",
          shotDate: "2010-07-25",
          caption: [
            "This parcel van comes in at 6:24 AM with the night train from KL, and is then shunted to Platform 3 to allow easy loading and unloading of goods from the *Kiriman Ekspres* (KTM Distribution) office.",
            "It departs Singapore at 10:30 PM the same day with the night train to KL, stopping at stations to pick up or drop off goods. Sometimes, 1 or 2 parcel vans are used, depending on the requirement."
          ],
          imageUrl: "https://github.com/t-plusone/plus.one-photos/blob/main/P7250273.jpg?raw=true"
        },
        {
          id: 2,
          title: "A broken clock is right twice a day. This one is right four times a day.",
          shotFrom: "along Keppel Road",
          shotDate: "2011-02-15",
          caption: "This side of the clock faces the East and has stopped at about 1:28.",
          imageUrl: "https://github.com/t-plusone/plus.one-photos/blob/main/P2150609.jpg?raw=true"
        },
        {
          id: 3,
          title: "",
          shotFrom: "",
          shotDate: "2010-11-18",
          caption: "The other side of the clock faces the West and has stopped at 12:30.",
          imageUrl: "https://github.com/t-plusone/plus.one-photos/blob/main/P7110211.jpg?raw=true"
        },
        {
          id: 4,
          title: "A train at the departure platform viewed through the Station fencing along Keppel Road.",
          shotFrom: "",
          shotDate: "2010-06-24",
          caption: "",
          imageUrl: "https://github.com/t-plusone/plus.one-photos/blob/main/P6240114.jpg?raw=true"
        }
      ]
    },
    {
      id: 4,
      name: "Interior of the Tanjong Pagar Railway Station",
      lat: 1.2729819,
      lng: 103.8386858,
      photos: [
        {
          id: 1,
          title: "Kaunter Tiket | Ticket Counter",
          shotFrom: "inside the Station",
          shotDate: "2010-06-24",
          caption: "No automated ticket machines. No stored-value electronic tickets either.",
          imageUrl: "https://github.com/t-plusone/plus.one-photos/blob/main/P6240097.jpg?raw=true"
        },
        {
          id: 2,
          title: "Station Main Hall",
          shotFrom: "",
          shotDate: "2010-10-03",
          caption: "No security guards, metal detectors or rifle-carrying soldiers.",
          imageUrl: "https://github.com/t-plusone/plus.one-photos/blob/main/PA031100.jpg?raw=true"
        },
        {
          id: 3,
          title: "F.M.S.R. again",
          shotFrom: "",
          shotDate: "2010-11-18",
          caption: "The acronym F.M.S.R. also appears on the north and south walls inside the station.",
          imageUrl: "https://github.com/t-plusone/plus.one-photos/blob/main/P6240095.jpg?raw=true"
        },
        {
          id: 4,
          title: "Depature Gate",
          shotFrom: "",
          shotDate: "2010-07-25",
          caption: "",
          imageUrl: "https://github.com/t-plusone/plus.one-photos/blob/main/P7250277.jpg?raw=true"
        }
      ]
    },
    {
      id: 5,
      name: "Murals murals on the walls (of the Tanjong Pagar Railway Station)",
      lat: 1.2729685,
      lng: 103.8384819,
      photos: [
        {
          id: 1,
          title: "Mural #1",
          shotFrom: "inside the Station",
          shotDate: "2010-07-25",
          caption: [
            "There are six murals high on the east and west walls in the main hall of the Station.",
            "To accurately represent the murals' composition, this image was post-processed to correct keystoning caused by the shooting angle.",
            "This mural shows workers in a rubber plantation."
          ],
          imageUrl: "https://github.com/t-plusone/plus.one-photos/blob/main/P7250286.jpg?raw=true"
        },
        {
          id: 2,
          title: "Mural #2",
          shotFrom: "",
          shotDate: "2010-07-25",
          caption: "This mural shows farmers in a rice field.",
          imageUrl: "https://github.com/t-plusone/plus.one-photos/blob/main/P7250287.jpg?raw=true"
        },
        {
          id: 3,
          title: "Mural #3",
          shotFrom: "",
          shotDate: "2010-07-25",
          caption: "This mural shows miners in a mine.",
          imageUrl: "https://github.com/t-plusone/plus.one-photos/blob/main/P7250288.jpg?raw=true"
        },
        {
          id: 4,
          title: "Mural #4",
          shotFrom: "",
          shotDate: "2010-07-25",
          caption: "This mural shows villagers plucking coconuts from coconut trees.",
          imageUrl: "https://github.com/t-plusone/plus.one-photos/blob/main/P7250290.jpg?raw=true"
        },
        {
          id: 5,
          title: "Mural #5",
          shotFrom: "",
          shotDate: "2010-07-25",
          caption: "This mural shows workers in a port, with different types of ships in the background.",
          imageUrl: "https://github.com/t-plusone/plus.one-photos/blob/main/P7250292.jpg?raw=true"
        },
        {
          id: 6,
          title: "Mural #6",
          shotFrom: "",
          shotDate: "2010-07-25",
          caption: "This mural shows villagers transporting goods with tools such as a bullock cart, with a train in the background.",
          imageUrl: "https://github.com/t-plusone/plus.one-photos/blob/main/P7250293.jpg?raw=true"
        }
      ]
    },
    {
      id: 6,
      name: "Arrival Platform in the Tanjong Pagar Railway Station",
      lat: 1.2731777,
      lng: 103.8381466,
      photos: [
        {
          id: 1,
          title: "Eating at the Arrival Platform",
          shotFrom: "",
          shotDate: "2010-10-09",
          caption: [
            "Patrons of the eating places in the Station can sit down at the arrival platform to enjoy their mee siam or teh tarik in a relaxed manner."
          ],
          imageUrl: "https://github.com/t-plusone/plus.one-photos/blob/main/PA091173.jpg?raw=true"
        },
        {
          id: 2,
          title: "Seats at the Arrival Platform",
          shotFrom: "",
          shotDate: "2011-05-20",
          caption: "",
          imageUrl: "https://github.com/t-plusone/plus.one-photos/blob/main/DSCF0013.jpg?raw=true"
        }
      ]
    },
    {
      id: 7,
      name: "Alongside Keppel Road",
      lat: 1.2728776,
      lng: 103.8340294,
      photos: [
        {
          id: 1,
          title: "Train Number 26 *Senandung Timuran* leaving Tanjong Pagar Railway Station",
          shotFrom: "from the 25th storey of 106 Spottiswoode Park Road",
          shotDate: "2010-11-18",
          caption: [
            "After departing Tanjong Pagar, a Malaysia-bound train first travels against Keppel Road's traffic flow before cruising alongside the Ayer Rajah Expressway in a northwesterly direction."
          ],
          imageUrl: "https://github.com/t-plusone/plus.one-photos/blob/main/PB180887.jpg?raw=true"
        }
      ]
    },
    {
      id: 8,
      name: "Alongside Ayer Rajah Expressway",
      lat: 1.2729068,
      lng: 103.8325596,
      photos: [
        {
          id: 1,
          title: "Train Number 14 *Ekspres Timuran* departing from Tanjong Pagar Railway Station",
          shotFrom: "along Keppel Road",
          shotDate: "2010-07-25",
          caption: [
            "The blocks of HDB flats in the background are Blks 111, 113 and 115, Bukit Purmei Road.",
            "They are visible from Keppel Road on the periphery of the Station."
          ],
          imageUrl: "https://github.com/t-plusone/plus.one-photos/blob/main/P7250271.jpg?raw=true"
        }
      ]
    },
    {
      id: 9,
      name: "Kampong Bahru Flyover",
      lat: 1.2749824,
      lng: 103.8297433,
      photos: [
        {
          id: 1,
          title: "Train Number 26 *Senandung Timuran* approaching the Kampong Bahru Flyover",
          shotFrom: "on Kampong Bahru Flyover",
          shotDate: "2010-08-01",
          caption: "The Kampong Bahru Flyover is the first major structure a Malaysia-bound train passes under after departing Tanjong Pagar.",
          imageUrl: "https://github.com/t-plusone/plus.one-photos/blob/main/P8010338.jpg?raw=true"
        },
        {
          id: 2,
          title: "",
          shotFrom: "on Kampong Bahru Flyover",
          shotDate: "2011-06-19",
          caption: "Train Number 26 *Senandung Timuran* approaching the Kampong Bahru Flyover about 3 minutes after departing from the Tanjong Pagar Railway Station.",
          imageUrl: "https://github.com/t-plusone/plus.one-photos/blob/main/DSCF0235.jpg?raw=true"
        }
      ]
    },
    
    {
      id: 10,
      name: "Approaching Henderson Flyover",
      lat: 1.2802055,
      lng: 103.8187730,
      photos: [
        {
          id: 1,
          title: "Train Number 26 *Senandung Timuran* approaching the Henderson Flyover",
          shotFrom: "on Henderson Flyover",
          shotDate: "2010-08-09",
          caption: [
            "After passing under the Kampong Bahru Flyover, a Malaysia-bound train goes under the Lower Delta Flyover before reaching the Henderson Flyover.",
            "As the train approaches the Henderson Flyover approximately 6 minutes after leaving the Tanjong Pagar Railway Station, one can see the thirty-storey tall Blk 17 Telok Blangah Crescent in the background."
          ],
          imageUrl: "https://github.com/t-plusone/plus.one-photos/blob/main/P8090377.jpg?raw=true"
        }
      ]
    },

    {
      id: 11,
      name: "Henderson Flyover",
      lat: 1.2806321,
      lng: 103.8180837,
      photos: [
        {
          id: 1,
          title: "Tanjong Pagar-bound Freight Train passing under Henderson Flyover",
          shotFrom: "from Blk 17 Telok Blangah Crescent",
          shotDate: "2011-02-17",
          caption: [
            "Photographed here is a Tanjong Pagar-bound freight train passing under the Henderson Flyover. To the left lies the Telok Blangah HDB estate; to the right, the Henderson industrial area."
          ],
          imageUrl: "https://github.com/t-plusone/plus.one-photos/blob/main/P2170666.jpg?raw=true"
        }
      ]
    },
    {
      id: 12,
      name: "After Henderson Flyover near Depot Road",
      lat: 1.2819672,
      lng: 103.8159513,
      photos: [
        {
          id: 1,
          title: "A Walk in the Park",
          shotFrom: "on the overhead bridge connecting Depot Road and Bukit Merach Central",
          shotDate: "2010-08-17",
          caption: [
            "Though walking along the railway track is risky, this couple appears familiar with the train schedule.",
            "Once again, the thirty-storey tall Blk 17 Telok Blangah Crescent can be seen in the background."
          ],
          imageUrl: "https://github.com/t-plusone/plus.one-photos/blob/main/P8170387.jpg?raw=true"
        }
      ]
    },
{
      id: 13,
      name: "Jalan Hang Jebat",
      lat: 1.2897443,
      lng: 103.7990186,
      photos: [
        {
          id: 1,
          title: "Off the Beaten Track",
          shotFrom: "near Masjid Hang Jebat",
          shotDate: "2010-08-31",
          caption: [
            "After Depot Road, a Malaysia-bound train continues alongside the Ayer Rajah Expressway until Gillman Flyover at Alexandra Road, where it diverges from the AYE and continues northwards. Here, it passes the Alexandra Hospital on its right before traveling past Jalan Hang Jebat, a well-concealed road that is off the beaten track.",
            "This photograph shows Tanjong Pagar-bound Train Number 13 *Ekspres Sinaran Selatan* ‒ originating from KL Sentral ‒ approaching Jalan Hang Jebat, with Blks 19-22 Queen's Close in the background."
          ],
          imageUrl: "https://github.com/t-plusone/plus.one-photos/blob/main/P8310543.jpg?raw=true"
        },
        {
          id: 2,
          title: "There and Back Again?",
          shotFrom: "near Masjid Hang Jebat",
          shotDate: "2010-08-31",
          caption: [
            "Since the railway tracks are property of KTM, and the land beneath them belongs to the Malaysian government, does stepping onto the tracks mean entering Malaysia?",
            "There is a Muslim mosque known as Masjid Hang Jebat at Jalan Hang Jebat. During the Muslim Haj period, this charitable mosque gives out free food to anyone, regardless of Muslims or otherwise - a Muslim uncle who saw me waiting for trains actually persuaded me to go get some free food there. I politely turned him down as I thought someone else needed it more than I did.",
            "Everyday, many Singaporeans cross at different points of the KTM railway tracks to get from one place to another, such as getting from one-north to Queensway at Jalan Hang Jebat."
          ],
          imageUrl: "https://github.com/t-plusone/plus.one-photos/blob/main/P8310510.jpg?raw=true"
        }
      ]
    },
    {
      id: 14,
      name: "Queensway Flyover",
      lat: 1.2944636,
      lng: 103.7987638,
      photos: [
        {
          id: 1,
          title: "Tanjong Pagar-bound Train approaching the Queensway Flyover",
          shotFrom: "from the Queensway Flyover",
          shotDate: "2011-06-17",
          caption: [
            "After passing Jalan Hang Jebat, a Malaysia-bound train passes under the Queensway Flyover and emerges on the left-hand side of the Blessed Sacrament Church on Commonwealth Drive.",
            "This photograph shows Tanjong Pagar-bound Shuttle Service Train Number 91 approaching the Queensway Flyover, with the colorful Blk 55 Commonwealth Drive in the background."
          ],
          imageUrl: "https://github.com/t-plusone/plus.one-photos/blob/main/P6171689.jpg?raw=true"
        }
      ]
    },
    {
      id: 15,
      name: "Near Woking Road",
      lat: 1.2950485,
      lng: 103.7984580,
      photos: [
        {
          id: 1,
          title: "Peekaboo at Woking Road",
          shotFrom: "from Woking Road",
          shotDate: "2010-08-30",
          caption: [
            "Immediately after passing the Blessed Sacrament Church, a Malaysia-bound train passes near Woking Road, appearing peekaboo among thick vegetation along the track. Looming large in the background is the 22-storey tall Blk 23A Queen's Close.",
            "From Tanjong Pagar to Woodlands, many parts of the railway tracks are well concealed by thick vegetation. It could be a way to keep people out of the railway tracks without building fences. This may also explain why few Singaporeans notice the KTM railway's presence in Singapore.",
            "Photographed here is the Malaysia-bound Train Number 26 *Senandung Timuran* that departed from Tanjong Pagar at 6 pm."
          ],
          imageUrl: "https://github.com/t-plusone/plus.one-photos/blob/main/P8300484.jpg?raw=true"
        }
      ]
    },
    {
      id: 16,
      name: "Near Biopolis",
      lat: 1.3016452,
      lng: 103.7947190,
      photos: [
        {
          id: 1,
          title: "As Close as it gets",
          shotFrom: "trackside near Biomedical Grove",
          shotDate: "2010-10-04",
          caption: [
            "As a Malaysia-bound train navigates further northwards after passing by Woking Road, it gets as close as about 20 to 25 metres from some of the HDB blocks near Commonwealth Park on its right-hand-side. These trains normally slow down when they reach this area.",
            "Along this stretch of the railway track, there are several shortcuts that have been artificially made to allow people to cross the railway track to get from Commonwealth area to Biopolis and Buona Vista areas, and vice versa.",
            "The buildings in the background are Synapse (left) and Immunos."
          ],
          imageUrl: "https://github.com/t-plusone/plus.one-photos/blob/main/PA041123.jpg?raw=true"
        }
      ]
    },
    {
      id: 17,
      name: "Near Buona Vista MRT Station",
      lat: 1.3066703,
      lng: 103.7919751,
      photos: [
        {
          id: 1,
          title: "Train meets Train (I)",
          shotFrom: "along Commonwealth Avenue opposite Blk 43 Commonwealth Avenue",
          shotDate: "2010-09-07",
          caption: [
            "As a Malaysia-bound KTM train leaves behind Biopolis, it will meet the Singapore Mass Rapid Transit (MRT) train/track for the very first time at the junction of North Buona Vista Road and Commonwealth Avenue near the Buona Vista MRT Station.",
            "Photographed here is the Malaysia-bound Train Number 26 *Senandung Timuran*, about 11 minutes after it departed from Tanjong Pagar Railway Station."
          ],
          imageUrl: "https://github.com/t-plusone/plus.one-photos/blob/main/P9070720.jpg?raw=true"
        }
      ]
    },

    {
      id: 18,
      name: "Near Ulu Pandan Community Club",
      lat: 1.3119583,
      lng: 103.7903255,
      photos: [
        {
          id: 1,
          title: "Malaysia-bound Train Winding through Ghim Moh",
          shotFrom: "from the 34th storey of Blk 18B Holland Drive",
          shotDate: "2011-06-29",
          caption: [
            "After passing under the MRT track near Buona Vista MRT Station, a Malaysia-bound train emerges between Ghim Moh estate on its left and Holland estate on its right, next to North Buona Vista Road. Here, a moving train will be visible to pedestrians and motorists traveling along North Buona Vista Road.",
            "From the top of the 34-storey Blk 18B Holland Drive, one can see the winding railway track meandering on the periphery of Ghim Moh estate, with Mount Sinai estate in the background."
            ],
          imageUrl: "https://github.com/t-plusone/plus.one-photos/blob/main/S0120061.jpg?raw=true"
        }
      ]
    },

    {
      id: 19,
      name: "Near East Sussex Lane",
      lat: 1.3129472,
      lng: 103.7897032,
      photos: [
        {
          id: 1,
          title: "Train Number 26 *Senandung Timuran* passing through Ghim Moh area",
          shotFrom: "from the pedestrian overhead bridge connecting East Sussex Lane and Ghim Moh",
          shotDate: "2010-09-08",
          caption: [
            "This would be a familiar sight for residents living in the Ghim Moh area.",
            "The prominent building in the background is the 34-storey tall Blk 18C Holland Drive."
            ],
          imageUrl: "https://github.com/t-plusone/plus.one-photos/blob/main/P9080729.jpg?raw=true"
        }
      ]
    },

     {
      id: 20,
      name: "Near Jalan Jelita",
      lat: 1.3148746,
      lng: 103.7872785,
      photos: [
        {
          id: 1,
          title: "Malaysia-bound Train heading towards Bukit Timah Railway Station",
          shotFrom: "trackside near Jalan Jelita",
          shotDate: "2011-05-15",
          caption: [
            "After navigating past Ghim Moh Estate, a Malaysia-bound train cruises past the former Raffles Junior College on its left, before going under Holland Road near Cold Storage Jelita.",
            "From this stretch onwards until the quaint and charming Bukit Timah Railway Station, the railway tracks are well-concealed by the heavy forestation along the tracks. One can only catch a glimpse of the trains and track near Ewart Park, off Holland and Ulu Pandan Roads, before the train reaches Bukit Timah Railway Station."
            ],
          imageUrl: "https://github.com/t-plusone/plus.one-photos/blob/main/P5151368.jpg?raw=true"
        }
      ]
    },

 {
      id: 21,
      name: "Bukit Timah Railway Station",
      lat: 1.3342922, 
      lng: 103.7811282,
      photos: [
        {
          id: 1,
          title: "Malayan Railway | Bukit Timah Railway Station",
          shotFrom: "along Bukit Timah Road near 1 King Albert Park",
          shotDate: "2011-03-02",
          caption: [
            "Nestled in a corner of Bukit Timah Road is the long-forgotten Bukit Timah Railway Station. Not many people knows of its existence. A signboard near King Albert Park, just below the iconic Railway Bridge spanning across Bukit Timah and Dunearn Roads, points towards this charming little station."
            ],
          imageUrl: "https://github.com/t-plusone/plus.one-photos/blob/main/P3020789.jpg?raw=true"
        },
         
        {
          id: 2,
          title: "The Charming Bukit Timah Railway Station",
          shotFrom: "",
          shotDate: "2011-03-02",
          caption: [
            "Compared to the grandeur of Tanjong Pagar Railway Station, Bukit Timah Railway Station is a charming, quaint station — reminiscent of KTM stations in small Malaysian towns like Kulai, Johor.",
            "Built in 1932, Bukit Timah Station ceased passenger operations years ago. Today, it serves as a passing loop — where a delayed train stops to wait for an oncoming train to pass before proceeding on the single-track KTM line."
            ],
          imageUrl: "https://github.com/t-plusone/plus.one-photos/blob/main/P3020802.jpg?raw=true"
        },
        {
          id: 3,
          title: "Bukit Timah — Singapura | Woodlands",
          shotFrom: "",
          shotDate: "2011-03-02",
          caption: [
            "Singapura (Tanjong Pagar) to the South, Woodlands to the North."
            ],
          imageUrl: "https://github.com/t-plusone/plus.one-photos/blob/main/P3020797.jpg?raw=true"
        },
        {
          id: 4,
          title: "Towards Singapura",
          shotFrom: "",
          shotDate: "2011-03-02",
          caption: [
                        ],
          imageUrl: "https://github.com/t-plusone/plus.one-photos/blob/main/P3020803.jpg?raw=true"
        },
        {
          id: 5,
          title: "Southern Wall of the Station facing the direction of Singapura",
          shotFrom: "",
          shotDate: "2011-03-02",
          caption: [
                        ],
          imageUrl: "https://github.com/t-plusone/plus.one-photos/blob/main/P3020806.jpg?raw=true"
          
        },
        {
          id: 6,
          title: "Waiting Area",
          shotFrom: "",
          shotDate: "2011-03-02",
          caption: [
            "It must have been a really long time since a train passenger last sat there to wait for a train."
                        ],
          imageUrl: "https://github.com/t-plusone/plus.one-photos/blob/main/P3020808.jpg?raw=true"
        },
        {
          id: 7,
          title: "Control Levers",
          shotFrom: "",
          shotDate: "2011-03-02",
          caption: [
            "These control levers allow the Station Master to control the railway signals as well as to switch tracks in the vicinity of the Station."
                        ],
          imageUrl: "https://github.com/t-plusone/plus.one-photos/blob/main/P3020793.jpg?raw=true"
        },
        {
          id: 8,
          title: "Key Token Post",
          shotFrom: "",
          shotDate: "2011-03-02",
          caption: [
            "At Bukit Timah Railway Station, the Station Master would receive a Key Token from an incoming train. This old-fashioned practice is still in place to ensure that at any one time, there is only one train on the single-track KTM railway within Singapore."
                        ],
          imageUrl: "https://github.com/t-plusone/plus.one-photos/blob/main/P3020810.jpg?raw=true"
        },
        {
          id: 9,
          title: "A Key Token being handed over to the Station Master",
          shotFrom: "",
          shotDate: "2011-03-02",
          caption: [
            "A Key Token is being handed over to the Bukit Timah Station Master by the driver of the approaching Malaysia-bound Train Number 26 *Senandung Timuran*."
                        ],
          imageUrl: "https://github.com/t-plusone/plus.one-photos/blob/main/P3020832.jpg?raw=true"
        },
        {
          id: 10,
          title: "A Key Token being placed onto the Token Post",
          shotFrom: "",
          shotDate: "2011-04-07",
          caption: [
            "A Key Token is being placed at the post by the driver on the Malaysia-bound Train Number 26 *Senandung Timuran*."
                        ],
          imageUrl: "https://github.com/t-plusone/plus.one-photos/blob/main/P4071158.jpg?raw=true"
        },
         {
          id: 11,
          title: "A Tanjong Pagar-bound train gets ready to depart from Bukit Timah Railway Station",
          shotFrom: "",
          shotDate: "2011-04-07",
          caption: [
            "The Shuttle Service Train Number 91 originating from Kuala Lipis leaves the Bukit Timah Railway Station and is scheduled to arrive at the Tanjong Pagar Railway Station at about 6:34 PM."
                        ],
          imageUrl: "https://github.com/t-plusone/plus.one-photos/blob/main/P4071164.jpg?raw=true"
        }
      ]
    },

      {
      id: 22,
      name: "Spotlight: KTM Staff Members (I)",
      lat: 1.3346860,
      lng: 103.7815011,
      photos: [
        {
          id: 1,
          title: "",
          shotFrom: "",
          shotDate: "",
          caption: [
            
            ],
          imageUrl: "https://github.com/t-plusone/plus.one-photos/blob/main/P3020809.jpg?raw=true"
        },
        {
          id: 2,
          title: "",
          shotFrom: "",
          shotDate: "",
          caption: [
                        ],
          imageUrl: "https://github.com/t-plusone/plus.one-photos/blob/main/P3020812.jpg?raw=true"
        },
        {
          id: 3,
          title: "",
          shotFrom: "",
          shotDate: "2011-03-02",
          caption: [
            
                        ],
          imageUrl: "https://github.com/t-plusone/plus.one-photos/blob/main/P3020821.jpg?raw=true"
        },
        {
          id: 4,
          title: "Bukit Timah Station Master Encik Atan",
          shotFrom: "",
          shotDate: "2011-04-07",
          caption: [
            "Encik Atan, who comes from Pontian, Johor, is a Station Master at the Bukit Timah Railway Station.",
            "He started working with the KTMB (Malaysian Railway Company) nearly 20 years ago and has been a Station Master for the past 2 years."
                        ],
          imageUrl: "https://github.com/t-plusone/plus.one-photos/blob/main/P4071146.jpg?raw=true"
        },
        {
          id: 5,
          title: "Sulhan the Fireman",
          shotFrom: "",
          shotDate: "2011-03-02",
          caption: [
          "Sulhan is a member of the KTM Railway Fan Club. After many years of being with the club, he managed to secure a job with KTM through staff recommendations.  Today, he is a fireman assisting the locomotive driver on various journeys, and is on his way to earning a promotion to be a locomotive driver.",
          "Here, he poses with the Malaysia-bound Train Number 26 *Senandung Timuran* at the Bukit Timah Railway Station."
                        ],
          imageUrl: "https://github.com/t-plusone/plus.one-photos/blob/main/P3020838.jpg?raw=true"
        }
      ]
    },

{
      id: 23,
      name: "North end of Bukit Timah Railway Station",
      lat: 1.3355766,
      lng: 103.7811685,
      photos: [
        {
          id: 1,
          title: "Malaysia-bound Train leaving the Bukit Timah Railway Station",
          shotFrom: "",
          shotDate: "2011-03-02",
          caption: [
            "The Malaysia-bound Train Number 26 *Senandung Timuran* departs from the Bukit Timah Railway Station 15 minutes after making a stop at the Station."
            
            ],
          imageUrl: "https://github.com/t-plusone/plus.one-photos/blob/main/P3020841.jpg?raw=true"
        }
      ]
    },

    {
      id: 24,
      name: "Bukit Timah Railway Bridge",
      lat: 1.3369463,
      lng: 103.7810531,
      photos: [
        {
          id: 1,
          title: "Malaysia-bound train crossing the Bukit Timah Railway Bridge",
          shotFrom: "along Dunearn Road near the Bridge",
          shotDate: "2011-03-29",
          caption: [
            "After departing from the Bukit Timah Railway Station, a Malaysian-bound train crosses Bukit Timah and Dunearn Roads via the Bukit Timah Railway Bridge, first of four overhead railway crossings between Bukit Timah and Woodlands.",
            ],
          imageUrl: "https://github.com/t-plusone/plus.one-photos/blob/main/P3290891.jpg?raw=true"
        }
      ]
    },

    {
      id: 25,
      name: "Alongside Rifle Range Road",
      lat: 1.3386140,
      lng: 103.7807500,
      photos: [
        {
          id: 1,
          title: "Malaysia-bound Train Number 2 *Ekpres Rakyat* cruising along Rifle Range Road",
          shotFrom: "along Rifle Range Road at the junction of Jalan Bangket",
          shotDate: "2010-09-17",
          caption: [
            "After crossing the Bukit Timah Railway Bridge, a Malaysian-bound train continues its journey along Rifle Range Road, where one can get as close as five metres from a passing train.",
            ],
          imageUrl: "https://github.com/t-plusone/plus.one-photos/blob/main/P9170926.jpg?raw=true"
        }
      ]
    },

    {
      id: 26,
      name: "Alongside Rifle Range Road near Jalan Bangket",
      lat: 1.3394632,
      lng: 103.7801921,
      photos: [
        {
          id: 1,
          title: "Launching Soon! | Suites de Laurel",
          shotFrom: "along Rifle Range Road at the junction of Jalan Bangket",
          shotDate: "2010-09-17",
          caption: [
                        ],
          imageUrl: "https://github.com/t-plusone/plus.one-photos/blob/main/P9170930.jpg?raw=true"
        }
      ]
    },

     {
      id: 27,
      name: "Hindhede Road Crossing",
      lat: 1.3454730,
      lng: 103.7755439,
      photos: [
        {
          id: 1,
          title: "Tanjong Pagar-bound Train at the Hindhede Road Crossing",
          shotFrom: "along Hindhede Road",
          shotDate: "2011-06-10",
          caption: [
          "After Rifle Range Road, a Malaysia-bound train navigates on the periphery of the Bukit Timah Nature Reserve, well-hidden from the public eye, until it crosses Hindhede Road via an overhead crossing. This overhead crossing is the second of four between Bukit Timah and Woodlands."
                        ],
          imageUrl: "https://github.com/t-plusone/plus.one-photos/blob/main/P6101506.jpg?raw=true"
        }
      ]
    },

    {
      id: 28,
      name: "Railway Bridge at Upper Bukit Timah Road",
      lat: 1.3579150,
      lng: 103.7674811,
      photos: [
        {
          id: 1,
          title: "Malaysia-bound Train crossing the Railway Bridge at Upper Bukit Timah Road",
          shotFrom: "at the junction of Jalan Asas and Upper Bukit Timah Road",
          shotDate: "2011-06-04",
          caption: [
          "Shortly after leaving Hindhede Road, a Malaysia-bound train then speeds across Upper Bukit Timah Road via another Railway Bridge, arguably the most famous railway icon (notwithstanding the Tanjong Pagar Railway Station) in the entire KTM railway system in Singapore.",
          "This bridge is the third of four overhead crossings between Bukit Timah and Woodlands.  Although there is another similar bridge across Bukit Timah and Dunearn Roads near the Bukit Timah Railway Station, in the memory of most older Singaporeans, 'Railway Bridge' (火车桥) more often than not refers to this bridge rather than its sibling at Bukit Timah Road."
                        ],
          imageUrl: "https://github.com/t-plusone/plus.one-photos/blob/main/P6041462.jpg?raw=true"
        },
      ]
    },

    {
      id: 29,
      name: "Hillview Road Crossing",
      lat: 1.3620564,
      lng: 103.7664400,
      photos: [
        {
          id: 1,
          title: "Malaysia-bound Train at the Hillview Road Crossing",
          shotFrom: "from a road divider on Hillview Road",
          shotDate: "2010-09-28",
          caption: [
          "The fourth and last overhead crossing between Bukit Timah and Woodlands is at Hillview Road, not too far from the Railway Bridge at Upper Bukit Timah Road.",
          "Photographed here is the Malaysia-bound Shuttle Service Train Number 62 that left Tanjong Pagar at 8:45 AM and is scheduled to arrive in Gemas at 1:46 PM."
                        ],
          imageUrl: "https://github.com/t-plusone/plus.one-photos/blob/main/P9281012.jpg?raw=true"
        }
      ]
    },

    {
      id: 30,
      name: "Gombak Crossing",
      lat: 1.3709530,
      lng: 103.7630019,
      photos: [
        {
          id: 1,
          title: "Tanjong Pagar-bound Train at the Gombak Crossing",
          shotFrom: "from roadside along Gombak Drive",
          shotDate: "2011-06-12",
          caption: [
          "After passing four overhead crossings, a Malaysia-bound train will traverse through five level crossings, the first of which is the level crossing at Gombak Drive.",
          "This photograph shows the Shuttle Service Train Number 91, which originated from Kuala Lipis, heading towards Tanjong Pagar."
                        ],
          imageUrl: "https://github.com/t-plusone/plus.one-photos/blob/main/P6121646.jpg?raw=true"
        }
      ]
    },

{
      id: 31,
      name: "Bukit Panjang Crossing",
      lat: 1.3791487,
      lng: 103.7600702,
      photos: [
        {
          id: 1,
          title: "Tanjong Pagar-bound Train at the Bukit Panjang Crossing",
          shotFrom: "from a road divider on Choa Chu Kang Road",
          shotDate: "2011-04-01",
          caption: [
          "The second level crossing between Bukit Timah and Woodlands is the Bukit Panjang Crossing, at which a Malaysia-bound train crosses Choa Chu Kang Road near the Ten Mile Junction (now Junction 10)."
                        ],
          imageUrl: "https://github.com/t-plusone/plus.one-photos/blob/main/P4011095.jpg?raw=true"
        },
        {
          id: 2,
          title: "Train meets Train (II)",
          shotFrom: "from Blk 152 Jalan Teck Whye",
          shotDate: "2011-04-08",
          caption: [
            "The Tanjong Pagar-bound Train Number 13 *Ekspres Sinaran Selatan* meets a train of the Bukit Panjang Light Rail Transit (BPLRT) at the Bukit Panjang Crossing."
                        ],
          imageUrl: "https://github.com/t-plusone/plus.one-photos/blob/main/P4081181.jpg?raw=true"
        }
      ]
    },

 {
      id: 32,
      name: "Near Ten Mile Junction (Junction 10)",
      lat: 1.3809392,
      lng: 103.7590939,
      photos: [
        {
          id: 1,
          title: "Malaysian-bound train near Teck Whye Estate",
          shotFrom: "from Woodlands Road near Ten Mile Junction (Junction 10)",
          shotDate: "2011-05-17",
          caption: [
            "Immediately after a Malaysia-bound train crosses the Bukit Panjang Crossing, it can be seen crossing a canal via a bridge in the vicinity of Ten Mile Junction, with some blocks of HDB flats in Jalan Teck Whye in the background.",
            "Photographed here is the Train Number 2 *Ekspres Rakyat* that left Tanjong Pagar Railway Station at 8:00 AM."
          ],
          imageUrl: "https://github.com/t-plusone/plus.one-photos/blob/main/P5171403.jpg?raw=true"
        }
      ]
    },

 {
      id: 33,
      name: "Mandai Crossing",
      lat: 1.3942815,
      lng: 103.7530267,
      photos: [
        {
          id: 1,
          title: "Malaysian-bound train at the Mandai Crossing",
          shotFrom: "from roadside on Stagmont Ring",
          shotDate: "2011-06-11",
          caption: [
            "The third of five level crossings between Bukit Timah and Woodlands is the Mandai Crossing, at which a Malaysia-bound train cuts across Stagmont Ring.",
            "Singaporeans know this crossing as the \"Stagmont Ring Crossing\" but from KTM's perspective, \"Mandai Crossing\" is its official name."
          ],
          imageUrl: "https://github.com/t-plusone/plus.one-photos/blob/main/P6111523.jpg?raw=true"
        }
      ]
    },

 {
      id: 34,
      name: "Near Sungei Kadut Avenue",
      lat: 1.4053957, 
      lng: 103.7542444,
      photos: [
        {
          id: 1,
          title: "Peekaboo at Sungei Kadut Avenue",
          shotFrom: "from Blk 687D Choa Chu Kang Drive",
          shotDate: "2011-05-15",
          caption: [
            "While vehicles wait at the nearby Sungei Kadut Crossing, a Tanjong Pagar-bound train does a peekaboo among the thick vegetation on both sides of the track, visible from Blk 687D Choa Chu Kang Drive."
          ],
          imageUrl: "https://github.com/t-plusone/plus.one-photos/blob/main/P5151387.jpg?raw=true"
        }
      ]
    },
{
      id: 35,
      name: "Sungei Kadut Crossing",
      lat: 1.4076322, 
      lng: 103.7547567,
      photos: [
        {
          id: 1,
          title: "Tanjong Pagar-bound train at Sungei Kadut Crossing",
          shotFrom: "from roadside on Sungei Kadut Avenue",
          shotDate: "2011-06-19",
          caption: [
            "Sungei Kadut Crossing is the second last of five level crossings between Bukit Timah and Woodlands.",
            "Photographed here is a Tanjong Pagar-bound train passing the Sungei Kadut Crossing as vehicles wait on along Sungei Kadut Avenue."
          ],
          imageUrl: "https://github.com/t-plusone/plus.one-photos/blob/main/P6191800.jpg?raw=true"
        }
      ]
    },

    {
      id: 36,
      name: "Kranji Crossing",
      lat: 1.4292766, 
      lng: 103.7562025,
      photos: [
        {
          id: 1,
          title: "Malaysia-bound train passing the little yellow KTM hut at Kranji Crossing",
          shotFrom: "from roadside on Kranji Road",
          shotDate: "2011-06-19",
          caption: [
            "Kranji Crossing is the final significant landmark in the entire KTM railway system between Tanjong Pagar and Woodlands.",
            "From here till Woodlands, a Malaysia-bound train will be well-concealed behind thick vegetation, only appearing briefly behind an Esso petrol station along Woodlands Road, before reaching the Woodlands Train Checkpoint."
          ],
          imageUrl: "https://github.com/t-plusone/plus.one-photos/blob/main/P6121608.jpg?raw=true"
        }
      ]
    },

     {
      id: 37,
      name: "Spotlight: KTM Staff Members (II)",
      lat: 1.4297163,
      lng: 103.7562776,
      photos: [
        {
          id: 1,
          title: "",
          shotFrom: "",
          shotDate: "2011-06-11",
          caption: [
            
            ],
          imageUrl: "https://github.com/t-plusone/plus.one-photos/blob/main/P6111577.jpg?raw=true"
        },
        {
          id: 2,
          title: "",
          shotFrom: "",
          shotDate: "2011-06-25",
          caption: [
            "Roslan has worked for KTM for over 25 years.",
            "He has spent the last 11 years based in Singapore - 10 years at the Sungei Kadut Crossing, and since early 2011, at the Kranji Crossing."
                        ],
          imageUrl: "https://github.com/t-plusone/plus.one-photos/blob/main/DSCF0009.jpg?raw=true"
        }
      
      ]
    },

    {
      id: 38,
      name: "The Causeway",
      lat: 1.4502533,
      lng: 103.7700749,
      photos: [
        {
          id: 1,
          title: "The End",
          shotFrom: "from Blk 215 Marsiling Lane",
          shotDate: "2010-12-13",
          caption: [
            "After departing the Woodlands Train Checkpoint, a Malaysia-bound train leaves Singapore via the Johor–Singapore Causeway.",
            "This photograph shows Train Number 2 *Ekspres Rakyat* leaving Singapore shortly after 9:00 AM."
          ],
          imageUrl: "https://github.com/t-plusone/plus.one-photos/blob/main/PC131745.jpg?raw=true"
        }
      ]
    }
  ];


  // Map configuration
  const homeCenter = [1.36, 103.825];
  const homeZoom = 12;

  const resetToHome = () => {
    if (!mapRef.current) return;
    mapRef.current.setView(homeCenter, homeZoom, { animate: true });
    setTimeout(() => {
      if (mapRef.current) {
        mapRef.current.invalidateSize({ pan: false });
      }
    }, 100);
  };

  useEffect(() => {
    const initMap = () => {
      if (mapRef.current) {
        mapRef.current.setView(homeCenter, homeZoom, { animate: false });
        requestAnimationFrame(() => {
          mapRef.current.invalidateSize();
        });
      }
    };
    const timer = setTimeout(initMap, 300);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      style={{
        backgroundColor: '#000',
        minHeight: '100vh',
        width: '100%',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        color: '#fff',
        padding: '0',
        margin: '0',
        overflowX: 'hidden'
      }}
    >
      <Header isHome={false} darkMode={true} />

      {/* INTRODUCTION */}
<div style={{
  padding: '60px 32px 40px',
  maxWidth: '1200px',
  margin: '0 auto',
  boxSizing: 'border-box'
}}>
  <h1 style={{
    fontSize: '2.5rem',
    fontWeight: 400,
    textAlign: 'center',
    marginBottom: '8px',
    letterSpacing: '0.02em'
  }}>
    A Journey Till the End
  </h1>
  <p style={{
    fontSize: '1.15rem',
    fontWeight: 300,
    color: '#aaa',
    textAlign: 'center',
    marginBottom: '24px',
    letterSpacing: '0.05em'
  }}>
    A Photographer’s Quest to Preserve the Memories of KTM in Singapore
  </p>
  <div style={{ maxWidth: '800px', margin: '0 auto', fontWeight: 300, lineHeight: 1.7, fontSize: '1.05rem' }}>
    <p>
      In May 2010, it was announced that from 1 July 2011, KTM (Keretapi Tanah Melayu) train services would depart from Woodlands instead of Tanjong Pagar Railway Station. KTM, or Malayan Railways, operated daily trains between Singapore and Malaysia, with Tanjong Pagar as its only station in Singapore.
    </p>
    <p>
      Although I had ridden KTM fewer than ten times in my life, I felt strongly that this marked the end of yet another legacy. Documentary photography has always been close to my heart. Singapore changes so quickly that I, as a photographer and a Son of this Land, have a moral obligation to preserve images of what will be gone forever.
    </p>
    <p>
  Thus my journey began at Tanjong Pagar Railway Station on a Thursday afternoon in June 2010. Over the next 360 days, I photographed KTM trains at publicly accessible locations across Singapore—from Tanjong Pagar to Woodlands. Every image was made with strict technical discipline: I composed each frame to include unmistakable symbols of Singapore—a road sign, an HDB block, familiar urban textures—so no photograph could be mistaken for Malaysia. (Two exceptions exist: photographs taken at Sungei Kadut Crossing and Kranji Crossing, where terrain prevented inclusion of a Singaporean symbol.) I timed my shoots to avoid shooting into the sun and waited, sometimes for hours, to capture an approaching train—never its receding back.
</p>
<p style={{ marginTop: '24px', fontStyle: 'italic', fontWeight: 300, fontSize: '1.1rem' }}>
  This story is a labour of love, but more importantly, it is a photographer's quest to preserve the memories of Singapore that we are losing, gradually and irreversibly.
</p>
  </div>
</div>

      {/* MAP + LEFT PANEL */}
      <div style={{ padding: '0 32px 40px', boxSizing: 'border-box' }}>
        <div
          style={{
            display: 'flex',
            height: '660px',
            maxWidth: '1400px',
            margin: '0 auto',
            gap: '20px',
            width: '100%',
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
            boxSizing: 'border-box'
          }}
        >
          {/* LEFT PANEL */}
          <div
            style={{
              width: '200px',
              minWidth: '180px',
              backgroundColor: '#111',
              borderRight: '1px solid #333',
              overflowY: 'auto',
              padding: '20px 16px',
              borderRadius: '8px 0 0 8px',
              flexShrink: 0
            }}
          >
            <h3
              style={{
                fontSize: '1rem',
                fontWeight: 500,
                marginBottom: '16px',
                color: '#fff'
              }}
            >
              Locations
            </h3>
            {ktmLocations.map((location) => (
              <button
                key={location.id}
                onClick={() => {
                  if (mapRef.current) {
                    mapRef.current.setView([location.lat, location.lng], 16, { animate: false });
                    setTimeout(() => {
                      if (mapRef.current) {
                        mapRef.current.setZoom(17, { animate: true });
                      }
                    }, 100);
                  }
                  setSelectedLocation(location);
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  textAlign: 'left',
                  padding: '8px 12px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '0.91rem',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                  color: '#ccc',
                  width: '100%',
                  fontWeight: selectedLocation?.id === location.id ? '600' : 'normal',
                  backgroundColor: selectedLocation?.id === location.id ? 'rgba(255,255,255,0.1)' : 'transparent'
                }}
              >
                <span style={{ color: '#fff', fontWeight: 'bold' }}>{location.id}.</span>{' '}
                {location.name}
              </button>
            ))}
          </div>

          {/* MAP */}
          <div
            style={{
              flex: 1,
              minWidth: '800px',
              borderRadius: '0 8px 8px 0',
              overflow: 'hidden',
              border: '1px solid #333',
              position: 'relative'
            }}
          >
            <MapContainer
              ref={mapRef}
              center={[1.35, 103.82]}
              zoom={11}
              zoomSnap={1}
              zoomDelta={1}
              style={{ height: '100%', width: '100%' }}
              scrollWheelZoom={true}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {ktmLocations
                .slice()
                .sort((a, b) => a.id - b.id)
                .map((location) => (
                  <Marker
                    key={location.id}
                    position={[location.lat, location.lng]}
                    icon={createNumberedIcon(location.id)}
                    zIndexOffset={10000 + (100 - location.id)}
                    eventHandlers={{
                      click: () => {
                        if (mapRef.current) {
                          mapRef.current.setView([location.lat, location.lng], 16, { animate: false });
                          setTimeout(() => {
                            if (mapRef.current) {
                              mapRef.current.setZoom(17, { animate: true });
                            }
                          }, 100);
                        }
                        setSelectedLocation(location);
                      }
                    }}
                  />
                ))}
            </MapContainer>
            <button
              onClick={resetToHome}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                zIndex: 1000,
                background: '#000',
                color: '#fff',
                border: '1px solid #fff',
                borderRadius: '4px',
                width: '36px',
                height: '36px',
                fontSize: '16px',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                padding: '0'
              }}
              title="Reset to full journey view"
            >
              🏠
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT SIDEBAR PANEL */}
      {selectedLocation && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            right: 0,
            bottom: 0,
            width: '420px',
            backgroundColor: 'white',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '-4px 0 12px rgba(0,0,0,0.15)'
          }}
        >
          <div
            style={{
              padding: '24px 32px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid #eee',
              flexShrink: 0
            }}
          >
            <h2
              style={{
                fontSize: '1.3rem',
                fontWeight: 500,
                color: '#000',
                margin: 0,
                lineHeight: 1.3
              }}
            >
              {selectedLocation.name}
            </h2>
            <button
              onClick={() => setSelectedLocation(null)}
              aria-label="Close panel"
              style={{
                background: 'none',
                border: 'none',
                fontSize: '19px',
                color: '#000',
                cursor: 'pointer',
                width: '26px',
                height: '26px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              ✕
            </button>
          </div>
          <div
            style={{
              padding: '0 32px 32px',
              overflowY: 'auto',
              flex: 1
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', marginTop: '16px' }}>
              {selectedLocation.photos.map((photo) => (
                <div key={photo.id} style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <img
                      src={photo.imageUrl.trim()}
                      alt={photo.title}
                      style={{
                        maxWidth: '100%',
                        maxHeight: '400px',
                        height: 'auto',
                        width: 'auto',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        border: '1px solid #eee'
                      }}
                      onClick={() => openLightbox(photo)}
                      onContextMenu={(e) => e.preventDefault()}
                    />
                  </div>
                  <h3
                    style={{
                      fontSize: '1.15rem',
                      fontWeight: 500,
                      marginTop: '16px',
                      marginBottom: '2px',
                      color: '#000',
                      lineHeight: 1.3
                    }}
                  >
                    {renderItalic(photo.title)}
                  </h3>
                  {!photo.isComposite && photo.shotDate && (
                    <p
                      style={{
                        fontSize: '0.95rem',
                        color: '#666',
                        fontStyle: 'italic',
                        marginTop: '0',
                        marginBottom: '8px',
                        lineHeight: 1.4
                      }}
                    >
                      Photographed {photo.shotFrom} on {formatDate(photo.shotDate)}.
                    </p>
                  )}
                  {Array.isArray(photo.caption) ? (
                    photo.caption.map((para, idx) => {
                      const isLong = para.length > 30;
                      const isLast = idx === photo.caption.length - 1;
                      return (
                        <p
                          key={idx}
                          style={{
                            color: '#495057',
                            lineHeight: 1.65,
                            fontSize: '1rem',
                            marginTop: idx === 0 ? (photo.isComposite ? '8px' : '4px') : '12px',
                            marginBottom: isLast ? '16px' : '0',
                            textAlign: isLong ? 'justify' : 'left',
                            hyphens: isLong ? 'auto' : 'none',
                            textJustify: isLong ? 'inter-word' : 'auto'
                          }}
                        >
                          {renderItalic(para)}
                        </p>
                      );
                    })
                  ) : (
                    <p
                      style={{
                        color: '#495057',
                        lineHeight: 1.65,
                        fontSize: '1rem',
                        marginTop: photo.isComposite ? '8px' : '4px',
                        marginBottom: '16px',
                        textAlign: photo.caption?.length > 30 ? 'justify' : 'left',
                        hyphens: photo.caption?.length > 30 ? 'auto' : 'none',
                        textJustify: photo.caption?.length > 30 ? 'inter-word' : 'auto'
                      }}
                    >
                      {renderItalic(photo.caption)}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
{/* Epilogue Button - properly elevated */}
{selectedLocation?.id === 38 && (
  <div style={{
    position: 'fixed',
    bottom: '60px', // ↑ 20px higher than before (from 40px → 60px)
    right: '440px',
    backgroundColor: '#1a1a1a',
    border: '1px solid #333',
    borderRadius: '6px',
    padding: '14px 28px',
    zIndex: 1001,
    boxShadow: '0 8px 20px rgba(0,0,0,0.6)', // ↑ stronger shadow for better "float"
    backdropFilter: 'blur(4px)',
    WebkitBackdropFilter: 'blur(4px)'
  }}>
    <button
      onClick={() => setEpilogueOpen(true)}
      style={{
        background: 'none',
        border: 'none',
        color: '#e0e0e0',
        fontSize: '1.2rem',
        cursor: 'pointer',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        fontWeight: 500,
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        transition: 'all 0.2s'
      }}
 onMouseEnter={(e) => {
  e.currentTarget.style.color = '#fff';
  e.currentTarget.style.transform = 'translateX(3px)';
  e.currentTarget.style.textShadow = '0 0 16px #64b4ff, 0 0 24px #64b4ff'; // Double glow for intensity
}}
onMouseLeave={(e) => {
  e.currentTarget.style.color = '#e0e0e0';
  e.currentTarget.style.transform = 'translateX(0)';
  e.currentTarget.style.textShadow = '0 0 8px rgba(100, 180, 255, 0.7)'; // Subtle base glow
}}
    >
      <span style={{ 
        fontSize: '1.5rem',
        fontWeight: 600,
        color: '#64b4ff',
        textShadow: '0 0 6px rgba(100, 180, 255, 0.8)'
      }}>→</span>
      <span style={{ 
        fontSize: '1.2rem',
        fontWeight: 500
      }}>Epilogue</span>
    </button>
  </div>
)}

      {/* PHOTO LIGHTBOX */}
      {lightboxPhoto && (
        <div
          onClick={closeLightbox}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.95)',
            zIndex: 2000,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px',
            cursor: 'zoom-out'
          }}
        >
          <img
            src={lightboxPhoto.imageUrl.trim()}
            alt={lightboxPhoto.title}
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              width: 'auto',
              height: 'auto',
              objectFit: 'contain'
            }}
            onContextMenu={(e) => e.preventDefault()}
          />
        </div>
      )}

  {/* Epilogue Lightbox — DSCF7012.JPG with preservation text */}
{epilogueOpen && (
  <div
    onClick={() => setEpilogueOpen(false)}
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.95)',
      zIndex: 2000,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '40px',
      cursor: 'pointer'
    }}
  >
    <button
      onClick={(e) => { e.stopPropagation(); setEpilogueOpen(false); }}
      style={{
        position: 'absolute',
        top: '30px',
        right: '30px',
        background: 'none',
        border: 'none',
        color: '#fff',
        fontSize: '32px',
        fontWeight: 'bold',
        cursor: 'pointer',
        width: '40px',
        height: '40px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.7,
        transition: 'opacity 0.2s'
      }}
      onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
      onMouseLeave={(e) => e.currentTarget.style.opacity = '0.7'}
      aria-label="Close epilogue"
    >
      ×
    </button>


    <img
      src="https://github.com/t-plusone/plus.one-photos/blob/main/DSCF7012.jpg?raw=true"
      alt="Tanjong Pagar Railway Station, 31 December 2011 — blurred station, sharp new fencing"
      style={{
        maxWidth: '90%',
        maxHeight: '60vh',
        width: 'auto',
        height: 'auto',
        objectFit: 'contain',
        marginBottom: '40px',
        borderRadius: '4px',
        border: '1px solid #333'
      }}
      onContextMenu={(e) => e.preventDefault()}
    />

    <div style={{
      maxWidth: '700px',
      color: '#ddd',
      lineHeight: 1.8,
      fontSize: '1.15rem',
      textAlign: 'center',
      fontWeight: 300,
      padding: '0 20px'
    }}>
      <p>
        This is not an ending. It is a preservation: the last train from Tanjong Pagar departed on 30 June 2011, but these images carry forward what was.
      </p>
      <p style={{ marginTop: '24px', fontStyle: 'italic', fontWeight: 300, fontSize: '1.2rem' }}>
        These images are not nostalgia — they are memorials crafted with care, precision, and respect.
      </p>
    </div>
  </div>
)}
      </div>
    );
  }

// ---------------- TOA PAYOH STORY MAP PAGE ----------------
function ToaPayohStoryMapPage() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [lightboxPhoto, setLightboxPhoto] = useState(null);
  const mapRef = useRef();

  const openLightbox = (photo) => setLightboxPhoto(photo);
  const closeLightbox = () => setLightboxPhoto(null);

  // Helper: Format date for captions
  function formatDate(isoDate) {
    if (!isoDate) return '';
    const date = new Date(isoDate);
    if (isNaN(date.getTime())) return '';
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }

  // Helper: Render italics from *asterisks*
  function renderItalic(text) {
    if (!text || typeof text !== 'string') return text;
    const parts = text.split('*');
    if (parts.length <= 1) return text;
    return parts.map((part, index) => {
      if (index % 2 === 1) {
        return <em key={index} style={{ fontStyle: 'italic' }}>{part}</em>;
      }
      return part;
    });
  }

  // Helper: Create numbered marker icons (white circle, black text)
  function createNumberedIcon(id) {
    return L.divIcon({
      className: 'numbered-marker',
      html: `<div style="
        background: #fff;
        color: #000;
        border-radius: 50%;
        width: 24px;
        height: 24px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 12px;
        font-weight: bold;
        box-shadow: 0 2px 6px rgba(0,0,0,0.4);
        border: 2px solid #000;
        position: relative;
      ">${id}</div>`,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
      riseOnHover: false
    });
  }

  // Toa Payoh Locations Data
  const toaPayohLocations = [
    {
      id: 1,
      name: 'Blk 28 Lor 6 Toa Payoh',
      lat: 1.3321283,
      lng: 103.8545430,
      photos: [
        {
          id: 1,
          title: 'The Dragon Playground',
          caption: 'Taken before Blk 28 was demolished, these photographs show the venerably world-renowned Dragon Playground in its original flavour - where the people who use it living close to it.',
          imageUrl: 'https://github.com/t-plusone/plus.one-photos/blob/main/P1020981.jpg?raw=true'
        }
      ]
    },
    {
      id: 2,
      name: 'Block 128 Toa Payoh Central',
      lat: 1.3558,
      lng: 103.8485,
      photos: [
        {
          id: 1,
          title: 'My Childhood Void Deck',
          shotFrom: 'across the void deck',
          shotDate: '2022-04-05',
          caption: 'Placeholder caption for Block 128 void deck.',
          imageUrl: 'https://github.com/t-plusone/plus.one-photos/blob/main/placeholder.jpg?raw=true'
        }
      ]
    },
    {
      id: 3,
      name: 'Toa Payoh MRT Station',
      lat: 1.3538,
      lng: 103.8468,
      photos: [
        {
          id: 1,
          title: 'Platform 1, 1987',
          shotFrom: 'on the platform',
          shotDate: '2022-04-12',
          caption: 'Placeholder caption for Toa Payoh MRT.',
          imageUrl: 'https://github.com/t-plusone/plus.one-photos/blob/main/placeholder.jpg?raw=true'
        }
      ]
    }
    // Add more locations here...
  ];

  // Map configuration
  const homeCenter = [1.3560, 103.8500];
  const homeZoom = 14;

  const resetToHome = () => {
    if (!mapRef.current) return;
    mapRef.current.setView(homeCenter, homeZoom, { animate: true });
    setTimeout(() => {
      if (mapRef.current) {
        mapRef.current.invalidateSize({ pan: false });
      }
    }, 100);
  };

  useEffect(() => {
    const initMap = () => {
      if (mapRef.current) {
        mapRef.current.setView(homeCenter, homeZoom, { animate: false });
        requestAnimationFrame(() => {
          mapRef.current.invalidateSize();
        });
      }
    };
    const timer = setTimeout(initMap, 300);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      style={{
        backgroundColor: '#000',
        minHeight: '100vh',
        width: '100%',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        color: '#fff',
        padding: '0',
        margin: '0',
        overflowX: 'hidden'
      }}
    >
      <Header isHome={false} darkMode={true} />

      {/* INTRODUCTION */}
      <div
        style={{
          padding: '60px 32px 40px',
          maxWidth: '1200px',
          margin: '0 auto',
          boxSizing: 'border-box'
        }}
      >
        <h1
          style={{
            fontSize: '2.5rem',
            fontWeight: 400,
            textAlign: 'center',
            marginBottom: '16px',
            letterSpacing: '0.02em'
          }}
        >
          A Stroll Down Memory Lane
        </h1>
        <div
          style={{
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: 1.7,
            fontSize: '1.05rem'
          }}
        >
          <p>
            Of the thirty-eight years of my existence, I lived in Toa Payoh for twenty-four years. Through those years, I have seen many changes in Toa Payoh — and to me, the evolution of this town is a microcosm of Singapore's transformation.
          </p>
          <p>
            I decided to take a stroll down memory lane to revisit places and people that were either part of my childhood or youth in Toa Payoh, or that I knew existed there. During my odyssey, I discovered that some objects, places and people still looked the same — except aged or with new coats of paint; other buildings have remained the same, but the occupants have changed or left.
          </p>
          <p>
            The most important discovery was this: I had forgotten how some places looked before their current forms. It is now up to us photographers to preserve our memories of the places that are significant in our lives.
          </p>
        </div>
      </div>

      {/* MAP + LEFT PANEL */}
      <div style={{ padding: '0 32px 40px', boxSizing: 'border-box' }}>
        <div
          style={{
            display: 'flex',
            height: '660px',
            maxWidth: '1400px',
            margin: '0 auto',
            gap: '20px',
            width: '100%',
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
            boxSizing: 'border-box'
          }}
        >
          {/* LEFT PANEL */}
          <div
            style={{
              width: '200px',
              minWidth: '180px',
              backgroundColor: '#111',
              borderRight: '1px solid #333',
              overflowY: 'auto',
              padding: '20px 16px',
              borderRadius: '8px 0 0 8px',
              flexShrink: 0
            }}
          >
            <h3
              style={{
                fontSize: '1rem',
                fontWeight: 500,
                marginBottom: '16px',
                color: '#fff'
              }}
            >
              Locations
            </h3>
            {toaPayohLocations.map((location) => (
              <button
                key={location.id}
                onClick={() => {
                  if (mapRef.current) {
                    mapRef.current.setView([location.lat, location.lng], 16, { animate: false });
                    setTimeout(() => {
                      if (mapRef.current) {
                        mapRef.current.setZoom(17, { animate: true });
                      }
                    }, 100);
                  }
                  setSelectedLocation(location);
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  textAlign: 'left',
                  padding: '8px 12px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '0.91rem',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                  color: '#ccc',
                  width: '100%',
                  fontWeight: selectedLocation?.id === location.id ? '600' : 'normal',
                  backgroundColor: selectedLocation?.id === location.id ? 'rgba(255,255,255,0.1)' : 'transparent'
                }}
              >
                <span style={{ color: '#fff', fontWeight: 'bold' }}>{location.id}.</span>{' '}
                {location.name}
              </button>
            ))}
          </div>

          {/* MAP */}
          <div
            style={{
              flex: 1,
              minWidth: '800px',
              borderRadius: '0 8px 8px 0',
              overflow: 'hidden',
              border: '1px solid #333',
              position: 'relative'
            }}
          >
            <MapContainer
              ref={mapRef}
              center={homeCenter}
              zoom={homeZoom}
              zoomSnap={1}
              zoomDelta={1}
              style={{ height: '100%', width: '100%' }}
              scrollWheelZoom={true}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {toaPayohLocations
                .slice()
                .sort((a, b) => a.id - b.id)
                .map((location) => (
                  <Marker
                    key={location.id}
                    position={[location.lat, location.lng]}
                    icon={createNumberedIcon(location.id)}
                    zIndexOffset={10000 + (100 - location.id)}
                    eventHandlers={{
                      click: () => {
                        if (mapRef.current) {
                          mapRef.current.setView([location.lat, location.lng], 16, { animate: false });
                          setTimeout(() => {
                            if (mapRef.current) {
                              mapRef.current.setZoom(17, { animate: true });
                            }
                          }, 100);
                        }
                        setSelectedLocation(location);
                      }
                    }}
                  />
                ))}
            </MapContainer>
            <button
              onClick={resetToHome}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                zIndex: 1000,
                background: '#000',
                color: '#fff',
                border: '1px solid #fff',
                borderRadius: '4px',
                width: '36px',
                height: '36px',
                fontSize: '16px',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                padding: '0'
              }}
              title="Reset to full journey view"
            >
              🏠
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT SIDEBAR PANEL */}
      {selectedLocation && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            right: 0,
            bottom: 0,
            width: '420px',
            backgroundColor: 'white',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '-4px 0 12px rgba(0,0,0,0.15)'
          }}
        >
          <div
            style={{
              padding: '24px 32px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid #eee',
              flexShrink: 0
            }}
          >
            <h2
              style={{
                fontSize: '1.3rem',
                fontWeight: 500,
                color: '#000',
                margin: 0,
                lineHeight: 1.3
              }}
            >
              {selectedLocation.name}
            </h2>
            <button
              onClick={() => setSelectedLocation(null)}
              aria-label="Close panel"
              style={{
                background: 'none',
                border: 'none',
                fontSize: '19px',
                color: '#000',
                cursor: 'pointer',
                width: '26px',
                height: '26px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              ✕
            </button>
          </div>
          <div
            style={{
              padding: '0 32px 32px',
              overflowY: 'auto',
              flex: 1
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', marginTop: '16px' }}>
              {selectedLocation.photos.map((photo) => (
                <div key={photo.id} style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <img
                      src={photo.imageUrl.trim()}
                      alt={photo.title}
                      style={{
                        maxWidth: '100%',
                        maxHeight: '400px',
                        height: 'auto',
                        width: 'auto',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        border: '1px solid #eee'
                      }}
                      onClick={() => openLightbox(photo)}
                      onContextMenu={(e) => e.preventDefault()}
                    />
                  </div>
                  <h3
                    style={{
                      fontSize: '1.15rem',
                      fontWeight: 500,
                      marginTop: '16px',
                      marginBottom: '2px',
                      color: '#000',
                      lineHeight: 1.3
                    }}
                  >
                    {renderItalic(photo.title)}
                  </h3>
                  {!photo.isComposite && photo.shotDate && (
                    <p
                      style={{
                        fontSize: '0.95rem',
                        color: '#666',
                        fontStyle: 'italic',
                        marginTop: '0',
                        marginBottom: '8px',
                        lineHeight: 1.4
                      }}
                    >
                      Photographed {photo.shotFrom && `from ${photo.shotFrom}`} on {formatDate(photo.shotDate)}.
                    </p>
                  )}
                  {Array.isArray(photo.caption) ? (
                    photo.caption.map((para, idx) => {
                      const isLong = para.length > 30;
                      const isLast = idx === photo.caption.length - 1;
                      return (
                        <p
                          key={idx}
                          style={{
                            color: '#495057',
                            lineHeight: 1.65,
                            fontSize: '1rem',
                            marginTop: idx === 0 ? (photo.isComposite ? '8px' : '4px') : '12px',
                            marginBottom: isLast ? '16px' : '0',
                            textAlign: isLong ? 'justify' : 'left',
                            hyphens: isLong ? 'auto' : 'none',
                            textJustify: isLong ? 'inter-word' : 'auto'
                          }}
                        >
                          {renderItalic(para)}
                        </p>
                      );
                    })
                  ) : (
                    <p
                      style={{
                        color: '#495057',
                        lineHeight: 1.65,
                        fontSize: '1rem',
                        marginTop: photo.isComposite ? '8px' : '4px',
                        marginBottom: '16px',
                        textAlign: photo.caption?.length > 30 ? 'justify' : 'left',
                        hyphens: photo.caption?.length > 30 ? 'auto' : 'none',
                        textJustify: photo.caption?.length > 30 ? 'inter-word' : 'auto'
                      }}
                    >
                      {renderItalic(photo.caption)}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* LIGHTBOX */}
      {lightboxPhoto && (
        <div
          onClick={closeLightbox}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.95)',
            zIndex: 2000,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px',
            cursor: 'zoom-out'
          }}
        >
          <img
            src={lightboxPhoto.imageUrl.trim()}
            alt={lightboxPhoto.title}
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              width: 'auto',
              height: 'auto',
              objectFit: 'contain'
            }}
            onContextMenu={(e) => e.preventDefault()}
          />
        </div>
      )}
    </div>
  );
}

// ---------------- PROJECT DETAIL PAGE ----------------
function ProjectPage() {
  const { projectId } = useParams();
  const project = projectData[projectId] || projectData['sg-urbanscape'];
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const openLightbox = (imageData) => {
    setSelectedImage(imageData);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setSelectedImage(null);
  };

  return (
    <div
      style={{
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        backgroundColor: 'white',
        color: '#1a1a1a',
        margin: 0,
        minHeight: '100vh'
      }}
    >
      <Header isHome={false} />
      <main
        style={{
          padding: '60px 32px 40px',
          maxWidth: '1500px',
          margin: '0 auto',
          width: '100%',
          boxSizing: 'border-box'
        }}
      >
        <h1
          style={{
            fontSize: '2.5rem',
            fontWeight: 400,
            marginBottom: '30px',
            letterSpacing: '0.02em'
          }}
        >
          {project.title}
        </h1>
        <div style={{ marginBottom: '12px' }}>
          <h2
            style={{
              fontSize: '1.1rem',
              fontWeight: 500,
              marginBottom: '6px',
              color: '#666'
            }}
          >
            Project type
          </h2>
          <p style={{ color: '#1a1a1a' }}>{project.type}</p>
        </div>
        <div style={{ marginBottom: '24px' }}>
          <h2
            style={{
              fontSize: '1.1rem',
              fontWeight: 500,
              marginBottom: '6px',
              color: '#666'
            }}
          >
            Location
          </h2>
          <p style={{ color: '#1a1a1a' }}>{project.location}</p>
        </div>
        <div style={{ marginBottom: '32px' }}>
          <h2
            style={{
              fontSize: '1.1rem',
              fontWeight: 500,
              marginBottom: '6px',
              color: '#666'
            }}
          >
            Description
          </h2>
          {Array.isArray(project.description) ? (
            project.description.map((paragraph, index) => (
              <p
                key={index}
                style={{
                  color: '#1a1a1a',
                  lineHeight: 1.6,
                  marginBottom: index === project.description.length - 1 ? '0' : '16px'
                }}
              >
                {paragraph}
              </p>
            ))
          ) : (
            <p style={{ color: '#1a1a1a', lineHeight: 1.6 }}>{project.description}</p>
          )}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {project.images.map((imageData, index) => (
            <div
              key={index}
              onClick={() => openLightbox(imageData)}
              style={{ cursor: 'pointer', position: 'relative' }}
            >
              <img
                src={imageData.src}
                alt={imageData.caption}
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  borderRadius: '4px'
                }}
                onContextMenu={(e) => e.preventDefault()}
              />
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'rgba(0,0,0,0)',
                  borderRadius: '4px',
                  transition: 'background-color 0.3s ease'
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = 'rgba(0,0,0,0.1)')}
                onMouseLeave={(e) => (e.target.style.backgroundColor = 'rgba(0,0,0,0)')}
              />
            </div>
          ))}
        </div>
      </main>
      {selectedImage && (
        <Lightbox
          isOpen={lightboxOpen}
          onClose={closeLightbox}
          image={selectedImage.src}
          caption={selectedImage.caption}
          metadata={selectedImage.metadata}
        />
      )}
    </div>
  );
}

// ---------------- STATIC PAGES ----------------
function AboutPage() {
  return (
    <div style={{ backgroundColor: 'white', minHeight: '100vh', color: '#1a1a1a' }}>
      <Header isHome={false} />
      <div style={{ padding: '60px 32px' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 400, marginBottom: '20px' }}>About</h1>
        <p
          style={{
            fontSize: '1.1rem',
            lineHeight: 1.6,
            maxWidth: '800px'
          }}
        >
          plus.one is a travel and urbanscape photographer specializing in capturing the unique character of cities around the world. With a keen eye for architectural details, urban geometry, and the interplay between built environments and natural elements, each photograph tells a story of place, time, and human experience.
        </p>
      </div>
    </div>
  );
}

function ContactPage() {
  return (
    <div style={{ backgroundColor: 'white', minHeight: '100vh', color: '#1a1a1a' }}>
      <Header isHome={false} />
      <div style={{ padding: '60px 32px' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 400, marginBottom: '20px' }}>Contact</h1>
        <p
          style={{
            fontSize: '1.1rem',
            lineHeight: 1.6,
            maxWidth: '800px'
          }}
        >
          For collaboration inquiries, print sales, or general questions, please reach out via email at contact@plusone.photos
        </p>
      </div>
    </div>
  );
}

// ============================================================================
// MAIN APP COMPONENT
// ============================================================================

function App() {
  return (
    <>
      <GlobalStyles />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/photo-documentaries" element={<PhotoDocumentariesPage />} />
          <Route
            path="/photo-documentaries/a-stroll-down-memory-lane"
            element={<ToaPayohStoryMapPage />}
          />
          <Route
            path="/photo-documentaries/a-journey-till-the-end"
            element={<KtmStoryMapPage />}
          />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route
            path="/portfolio-collections/my-portfolio/:projectId"
            element={<ProjectPage />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;