// React & core
import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';

// Leaflet JS
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon } from 'leaflet';

// Leaflet CSS
import "leaflet/dist/leaflet.css";
import L from 'leaflet';

// =============== GLOBAL STYLES ===============
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



// Fix marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Project data (unchanged)
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
        src: "https://github.com/t-plusone/plus.one-photos/blob/main/IMG_0365.jpg?raw=true",
        caption: "Spiral",
        metadata: [
          "Published in the 2005 photo-book 'To Singapore with Love' as part of the nation’s 40th National Day tribute.",
          "Shot on Canon EOS 20D"
        ]
      },
      {
        src: "https://github.com/t-plusone/plus.one-photos/blob/main/_DSF4459.jpg?raw=true",
        caption: "Inspired by MC Escher",
        metadata: [
          "Were the town planners in Singapore inspired by MC Escher when they designed the town of Toa Payoh back in the 1960s? I doubt they were, but one will never know. Millions of Singaporeans live in government-built apartments within these blocks of 'HDB flats'. (HDB, or Housing Development Board of Singapore, is the government department that build and manage these apartments.) 'HDB flats' has become a symbol of Singapore, loved by their inhabitants and providing a blueprint to many other countries in the world for the development of their own public housing. These 'public housing' estates in Singapore are safe, clean and often spacious and well constructed internally - a far cry from the slums or ghettos associated with 'public housing' in other countries.",
          "Location: Toa Payoh, Singapore",
          "Awarded 'Honorable Mention' in Chromatic Awards 2023"
        ]
      }
//      {
//        src: "https://github.com/t-plusone/plus.one-photos/blob/main/IMG_0367.jpg?raw=true",
//        caption: "Singapore Central Business District",
//        meta [
//          "Commissioned for Singapore Tourism Board",
//          "Published in National Geographic Travel"
//        ]
//      }
    ]
  },
  'sychedelic': {
    title: 'sychedelic southerncross station',
    type: 'one-shoot photo documentary',
    location: 'Melbourne, Australia',
    description: [
      'Shot during the electric haze of an early winter evening rush hour, this series transforms Melbourne’s Southern Cross Station into a radiant, kinetic dreamscape. From soaring vantage points to ground-level chaos, each frame pulses with motion: commuters dissolve into streaks of color, trains blaze as neon comets, and the station’s iconic ribbed roof glows like a molten canopy over the throng below.',
      'Artificial light fractures through glass and steel, painting the scene in prisms of electric blue, amber, and spectral green. The air hums—not with steam, but with the visible energy of movement: footsteps, arrivals, departures, all rendered as liquid trails of light and shadow. Even stillness feels charged; waiting figures hover like ghosts caught between destinations.',
      'This is not documentation—it’s transmutation. A fleeting window of urban flux, stretched and amplified, where architecture bends to the rhythm of human flow, and every reflection shimmers with the pulse of the city at its most alive.'
    ],
     images: [
      {
        src: "https://github.com/t-plusone/plus.one-photos/blob/main/_DSF5918.jpg?raw=true",
        caption: "Undulating roof structure",
        metadata: [
          "Winner: Australian Architecture Awards 2023",
          "Featured in Dezeen Architecture"
        ]
      },
      {
        src: "https://github.com/t-plusone/plus.one-photos/blob/main/_DSF5922.jpg?raw=true",
        caption: "Interior light play",
        metadata: [
          "Exhibited at Melbourne Photography Festival",
          "Shot during golden hour"
        ]
      },
      {
        src: "https://github.com/t-plusone/plus.one-photos/blob/main/_DSF5939.jpg?raw=true",
        caption: "Colorful terminal entrance",
        metadata: [
          "Limited edition of 25 prints",
          "Acquired by State Library Victoria"
        ]
      },

{
        src: "https://github.com/t-plusone/plus.one-photos/blob/main/_DSF5942.jpg?raw=true",
        caption: "Undulating roof structure",
        metadata: [
          "Winner: Australian Architecture Awards 2023",
          "Featured in Dezeen Architecture"
        ]
      },

{
        src: "https://github.com/t-plusone/plus.one-photos/blob/main/_DSF5947.jpg?raw=true",
        caption: "Undulating roof structure",
        metadata: [
          "Winner: Australian Architecture Awards 2023",
          "Featured in Dezeen Architecture"
        ]
      },

{
        src: "https://github.com/t-plusone/plus.one-photos/blob/main/_DSF5953.jpg?raw=true",
        caption: "Undulating roof structure",
        metadata: [
          "Winner: Australian Architecture Awards 2023",
          "Featured in Dezeen Architecture"
        ]
      },

{
        src: "https://github.com/t-plusone/plus.one-photos/blob/main/_DSF5951.jpg?raw=true",
        caption: "Undulating roof structure",
        metadata: [
          "Winner: Australian Architecture Awards 2023",
          "Featured in Dezeen Architecture"
        ]
      }

    ]

  }
//  'project-title-3': {
//    title: 'SkyMine HQ',
//    type: 'Corporate Architecture',
//    location: 'Shanghai, China',
//    description: [
//      'Documenting the futuristic SkyMine headquarters, showcasing innovative design and sustainable architecture in modern China.',
//      'This corporate campus represents the cutting edge of sustainable urban development, featuring advanced environmental systems, renewable energy integration, and spaces //designed to foster collaboration and innovation.',
//      'The photographs capture both the grand scale of the architecture and the intimate human moments that occur within these spaces.'
//    ],
//    images: [
//      { src: "https://github.com/t-plusone/plus.one-photos/blob/main/skymine.jpg?raw=true", caption: "SkyMine headquarters aerial view", meta ["Commissioned by SkyMine //Corporation"] },
//      { src: "https://github.com/t-plusone/plus.one-photos/blob/main/skymine2.jpg?raw=true", caption: "Sustainable design elements", meta ["Featured in Green Building //Journal"] },
//     { src: "https://github.com/t-plusone/plus.one-photos/blob/main/skymine3.jpg?raw=true", caption: "Interior collaborative spaces", meta ["Published in Interior Design //Magazine"] }
//    ]
//  },
// 'project-title-4': {
//    title: 'Urban Reflections',
//    type: 'Street Photography',
//    location: 'Tokyo, Japan',
//    description: [
//      'Capturing the reflective surfaces and mirrored realities of Tokyo\'s urban environment, where glass and steel create endless visual poetry.',
//      'Tokyo\'s dense urban fabric is filled with reflective surfaces that create complex visual layers. This series explores how these reflections transform and reinterpret //the cityscape, often creating abstract compositions that challenge our perception of reality.'
//    ],
//    images: [
//      { src: "https://github.com/t-plusone/plus.one-photos/blob/main/project4.jpg?raw=true", caption: "Shibuya crossing reflections", meta ["Winner: Tokyo Street Photography //Contest 2023"] },
//      { src: "https://github.com/t-plusone/plus.one-photos/blob/main/project4_2.jpg?raw=true", caption: "Rainy day glass facades", meta ["Featured in Japanese Photography //Annual"] },
//      { src: "https://github.com/t-plusone/plus.one-photos/blob/main/project4_3.jpg?raw=true", caption: "Nighttime neon reflections", meta ["Commissioned for Tokyo Tourism //campaign"] }
//    ]
//  },
//  'project-title-5': {
//    title: 'Concrete Dreams',
//    type: 'Brutalist Architecture',
//    location: 'London, UK',
//    description: [
//      'An intimate study of London\'s brutalist architecture, finding beauty in raw concrete and geometric forms that define post-war urban planning.',
//      'Brutalist architecture, often misunderstood and criticized, reveals its poetic qualities through careful observation. The weathering of concrete, the play of light and //shadow on massive forms, and the human scale embedded within monumental structures all tell stories of a particular moment in architectural history.',
//      'This series aims to celebrate rather than condemn, finding unexpected grace in what others might see as cold or imposing.'
//    ],
//    images: [
//      { src: "https://github.com/t-plusone/plus.one-photos/blob/main/project5.jpg?raw=true", caption: "Barbican Estate geometric forms", meta ["Winner: UK Architecture //Photography Prize 2023"] },
//      { src: "https://github.com/t-plusone/plus.one-photos/blob/main/project5_2.jpg?raw=true", caption: "Trellick Tower details", meta ["Exhibited at London Architecture //Festival"] },
//      { src: "https://github.com/t-plusone/plus.one-photos/blob/main/project5_3.jpg?raw=true", caption: "Southbank Centre textures", meta ["Published in Concrete Architecture //Quarterly"] }
//    ]
//  },
//  'project-title-6': {
//    title: 'Vertical Horizons',
//    type: 'Skyline Photography',
//    location: 'New York, USA',
//    description: [
//      'Exploring New York City\'s iconic skyline from unique vantage points, capturing the vertical rhythm of America\'s most famous urban landscape.',
//      'New York\'s skyline is constantly evolving, with new towers rising alongside historic landmarks. This series captures the city at different times of day and in various //weather conditions, revealing the ever-changing character of this vertical metropolis.',
//      'Each photograph seeks to capture not just the physical structures, but the energy and ambition that built them.'
//    ],
//    images: [
//      { src: "https://github.com/t-plusone/plus.one-photos/blob/main/project6.jpg?raw=true", caption: "Manhattan skyline at dawn", metadata: ["Winner: New York Photography //Awards 2024"] },
//      { src: "https://github.com/t-plusone/plus.one-photos/blob/main/project6_2.jpg?raw=true", caption: "Brooklyn Bridge perspective", meta ["Exhibited at MoMA Photography //Exhibition"] },
//      { src: "https://github.com/t-plusone/plus.one-photos/blob/main/project6_3.jpg?raw=true", caption: "Empire State Building storm", meta ["Published in National //Geographic"] }
//    ]
//  }
};

// =============== LIGHTBOX (Mobile-Optimized) ===============
function Lightbox({ isOpen, onClose, image, caption, metadata }) {
  if (!isOpen) return null;

  // Detect if mobile (portrait or landscape)
  const isMobile = window.innerWidth <= 768;

  return (
    <div 
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
      onClick={onClose}
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

        <div style={{ 
          width: '100%',
          padding: isMobile ? '16px' : '20px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          ...(isMobile ? {} : { flex: 2, minWidth: '400px' })
        }}>
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

        <div style={{ 
          width: '100%',
          padding: isMobile ? '0 16px 16px' : '20px',
          ...(isMobile ? {} : { flex: 1, minWidth: '300px', overflowY: 'auto' })
        }}>
          <h3 style={{ 
            fontSize: isMobile ? '1rem' : '1.2rem',
            fontWeight: 500, 
            marginBottom: '12px',
            color: '#1a1a1a'
          }}>
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
// =============== NAVIGATION (updated) ===============
function Navigation({ isHome, darkMode = false }) {
  const color = isHome ? 'white' : (darkMode ? 'white' : '#1a1a1a');
  return (
    <nav className="desktop-menu">
      <Link to="/portfolio" style={{ marginLeft: '32px', textDecoration: 'none', color: color, opacity: 0.9, fontSize: '0.95rem', fontWeight: 400 }}>portfolio</Link>
      <Link to="/photo-documentaries" style={{ marginLeft: '32px', textDecoration: 'none', color: color, opacity: 0.9, fontSize: '0.95rem', fontWeight: 400 }}>photo documentaries</Link>
      <Link to="/about" style={{ marginLeft: '32px', textDecoration: 'none', color: color, opacity: 0.9, fontSize: '0.95rem', fontWeight: 400 }}>about</Link>
      <Link to="/contact" style={{ marginLeft: '32px', textDecoration: 'none', color: color, opacity: 0.9, fontSize: '0.95rem', fontWeight: 400 }}>contact</Link>
    </nav>
    
  );
}

// =============== MOBILE MENU (Side Drawer) ===============
function MobileMenu({ isHome, darkMode = false, isOpen, onClose }) {
  // Reuse your existing color logic
  const color = isHome ? 'white' : (darkMode ? 'white' : '#1a1a1a');
  const bgColor = isHome ? 'rgba(0,0,0,0.9)' : (darkMode ? '#000' : '#fff');

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
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
      {/* Side Drawer */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          height: '100vh',
          width: '280px',
          backgroundColor: bgColor,
          color: color,
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
            color: color,
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
              style={{ color: color, textDecoration: 'none', fontSize: '1.1rem' }}
              onClick={onClose}
            >
              portfolio
            </Link>
          </div>
          <div style={{ marginBottom: '20px' }}>
            <Link 
              to="/photo-documentaries" 
              style={{ color: color, textDecoration: 'none', fontSize: '1.1rem' }}
              onClick={onClose}
            >
              photo documentaries
            </Link>
          </div>
          <div style={{ marginBottom: '20px' }}>
            <Link 
              to="/about" 
              style={{ color: color, textDecoration: 'none', fontSize: '1.1rem' }}
              onClick={onClose}
            >
              about
            </Link>
          </div>
          <div>
            <Link 
              to="/contact" 
              style={{ color: color, textDecoration: 'none', fontSize: '1.1rem' }}
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

// =============== DYNAMIC LOGO ===============
function Logo({ isHome = false, darkMode = false }) {
  const logoWhite = "https://raw.githubusercontent.com/t-plusone/plus.one-photos/main/plusone_logo_white.png";
  const logoBlack = "https://raw.githubusercontent.com/t-plusone/plus.one-photos/main/plusone_logo_black.png";

  let logoUrl;

  if (isHome) {
    // ✅ Splash page uses WHITE logo
    logoUrl = logoWhite;
  } else {
    // Auto: white on dark bg, black on light bg
    logoUrl = darkMode ? logoWhite : logoBlack;
  }

  return (
    <Link to="/">
      <img 
        src={logoUrl}
        alt="plus.one"
        style={{ width: '130px', height: '60px', objectFit: 'contain' }}
        onError={(e) => {
          console.error("Failed to load logo:", logoUrl);
          e.target.style.opacity = 0.5;
        }}
      />
    </Link>
  );
}

// =============== HEADER (updated) ===============
function Header({ isHome, darkMode = false }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerBg = isHome ? 'rgba(0, 0, 0, 0.40)' : 'transparent';
  const buttonColor = isHome ? 'white' : (darkMode ? 'white' : '#1a1a1a');
  
  return (
    <header style={{
      padding: '24px 32px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'relative',
      zIndex: 10,
      backgroundColor: headerBg
    }}>
      <div><Logo isHome={isHome} darkMode={darkMode} /></div>
      <Navigation isHome={isHome} darkMode={darkMode} />
      <button 
        onClick={() => setMenuOpen(!menuOpen)}
        style={{ background: 'none', border: 'none', color: buttonColor, fontSize: '24px', display: 'none' }}
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


// =============== HOMEPAGE ===============
function HomePage() {
  const isMobile = window.innerWidth <= 768;
  
  const desktopHero = "https://github.com/t-plusone/plus.one-photos/blob/main/PA031063.JPG?raw=true";
  const mobileHero = "https://raw.githubusercontent.com/t-plusone/plus.one-photos/main/PA031063m.JPG";
  
  const heroImage = isMobile ? mobileHero : desktopHero;

  return (
    <div style={{ 
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', 
      margin: 0, 
      overflowX: 'hidden' 
    }}>
      <div style={{ 
        minHeight: '100vh', 
        width: '100%', 
        backgroundImage: `url(${heroImage.trim()})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        backgroundRepeat: 'no-repeat', 
        display: 'flex', 
        flexDirection: 'column', 
        position: 'relative' 
      }}>
        <div style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0, 
          backgroundColor: 'rgba(0, 0, 0, 0.10)' 
        }} />
        <Header isHome={true} />
        <div style={{ 
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
        }}>
          <h1 style={{ 
            fontSize: 'clamp(2rem, 8vw, 3rem)', 
            fontWeight: 300, 
            marginBottom: '1rem', 
            letterSpacing: '0.05em', 
            lineHeight: 1.2, 
            textShadow: '2px 2px 4px rgba(0,0,0,0.9)' 
          }}>
            <span style={{ color: 'white' }}>plus</span>
            <span style={{ color: '#bbb' }}>one</span>
          </h1>
          <p style={{ 
            fontSize: 'clamp(1rem, 5vw, 1.5rem)', 
            fontWeight: 300, 
            letterSpacing: '0.2em', 
            lineHeight: 1.2, 
            textShadow: '2px 2px 4px rgba(0,0,0,0.9)', 
            color: 'white' 
          }}>
            travel & urbanscape photographer
          </p>
        </div>
      </div>
    </div>
  );
}
// =============== PORTFOLIO PAGE ===============
function PortfolioPage() {
  const projects = [
    { id: 'sg-urbanscape', title: 'singapore urbanscape', image: "https://github.com/t-plusone/plus.one-photos/blob/main/IMG_0365.jpg?raw=true" },
    { id: 'sychedelic', title: 'sychedelic southerncross station', image: "https://github.com/t-plusone/plus.one-photos/blob/main/_DSF5939.jpg?raw=true" }
  ];

  return (
    <div style={{ 
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      backgroundColor: 'white',
      color: '#1a1a1a',
      minHeight: '100vh',
      width: '100%'
    }}>
      <Header isHome={false} />
      <div style={{ 
        padding: '60px 32px 40px', 
        maxWidth: '1500px', 
        margin: '0 auto',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          fontWeight: 400, 
          textAlign: 'center', 
          marginBottom: '40px', 
          letterSpacing: '0.02em' 
        }}>
          portfolio
        </h1>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(2, 1fr)', 
          gap: '24px', 
          width: '100%' 
        }}>
          {projects.map((project, index) => (
            <Link key={index} to={`/portfolio-collections/my-portfolio/${project.id}`} style={{ display: 'block', textDecoration: 'none', width: '100%' }}>
              <img 
                src={project.image.trim()} 
                alt={project.title} 
                style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '4px' }} 
                onContextMenu={e => e.preventDefault()} 
              />
              <div style={{ textAlign: 'center', fontSize: '0.95rem', fontWeight: 400, marginTop: '12px', color: '#1a1a1a' }}>
                {project.title}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

// =============== PHOTO DOCUMENTARIES PAGE ===============
function PhotoDocumentariesPage() {
  const documentaries = [
    {
      slug: 'ktm-story',
      title: 'A Journey Till The End',
      coverImage: 'https://github.com/t-plusone/plus.one-photos/blob/main/P8010338.jpg?raw=true'
    }
  ];

  return (
    <div style={{ 
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      backgroundColor: '#000',
      minHeight: '100vh',
      color: '#fff',
      width: '100%'
    }}>
      <Header isHome={false} darkMode={true} />
      <div style={{ 
        padding: '60px 32px 40px', 
        maxWidth: '1500px', 
        margin: '0 auto',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <h1 style={{ 
          fontSize: '2.5rem',
          fontWeight: 400,
          textAlign: 'center',
          marginBottom: '40px',
          letterSpacing: '0.02em'
        }}>
          photo documentaries
        </h1>
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '24px',
          width: '100%'
        }}>
          {documentaries.map((doc, index) => (
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
                  display: 'block'
                }}
                onContextMenu={(e) => e.preventDefault()}
              />
              <div style={{ 
                textAlign: 'center', 
                fontSize: '0.95rem', 
                fontWeight: 400, 
                marginTop: '12px',
                color: '#fff'
              }}>
                {doc.title}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
// =============== KTM STORY MAP PAGE ===============
function KtmStoryMapPage() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [lightboxPhoto, setLightboxPhoto] = useState(null);
  const mapRef = useRef();

  const openLightbox = (photo) => setLightboxPhoto(photo);
  const closeLightbox = () => setLightboxPhoto(null);

  function formatDate(isoDate) {
    const date = new Date(isoDate);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }

function createNumberedIcon(id) {
  // Remove zIndex from inline style — zIndexOffset handles it
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

  const ktmLocations = [
    {
      id: 1,
      name: "Entrance of the Tanjong Pagar Railway Station",
      lat: 1.2730275,
      lng: 103.8389164,
      photos: [
        {
          id: 1,
          title: "Tanjong Pagar Railway Station",
          shotFrom: "from the carpark of the Station",
          shotDate: "2011-02-09",
          caption: "Built in 1932, the Tanjong Pagar Railway Station is the showpiece of the KTM Railway System within Singapore and is located along Keppel Road.",
          imageUrl: "https://github.com/t-plusone/plus.one-photos/blob/main/P2090545.jpg?raw=true"
        },
        {
          id: 2,
          title: "Tanjong Pagar Railway Station frontal view",
          shotFrom: "",
          shotDate: "2010-10-09",
          caption: "",
          imageUrl: "https://github.com/t-plusone/plus.one-photos/blob/main/PA091165.jpg?raw=true"
        },
        {
          id: 3,
          title: "F.M.S.R.",
          shotFrom: "",
          shotDate: "",
          caption: [
            "The acronym \"F.M.S.R.\" can be found in several places at the Railway Station.  It stands for \"Federal Malay States Railway\".",
            "I guess it must have been the name of the railway systems in Malaya during the British colonial period. An example where F.M.S.R. can be found is above the 4 towering statues at the entrance of the Railway Station.",
            "These 4 statues are named Agriculture, Commerce, Transport and Industry - symbols of Malaya's economic pillars, with each personification holding symbols unique to their character."
          ],
          imageUrl: "https://github.com/t-plusone/plus.one-photos/blob/main/013.jpg?raw=true",
          isComposite: true
        }
      ]
    },
    {
      id: 2,
      name: "North side of the Station",
      lat: 1.2733707,
      lng: 103.8386348,
      photos: [
        {
          id: 1,
          title: "A simple fencing",
          shotFrom: "",
          shotDate: "2010-11-18",
          caption: [
            "On the north side of the Railway Station, there is a side entrance into the Station compound from Spottiswoode Park Road.",
            "The fencing on this side of the Station looks simple - I am reminded of the simplicity and innocence of an age gone by."
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
          caption: "Many motorbikes are parked on this side of the Station.  They probably belong to the people who work in the Railway Station.",
          imageUrl: "https://github.com/t-plusone/plus.one-photos/blob/main/PB180858.jpg?raw=true"
        }
      ]
    },
    {
      id: 3,
      name: "South side of the Station",
      lat: 1.2726253,
      lng: 103.8377604,
      photos: [
        {
          id: 1,
          title: "Kiriman Ekspres",
          shotFrom: "along Keppel Road",
          shotDate: "2010-07-25",
          caption: [
            "This parcel van comes in at 0624hrs with the night train from KL, and is then shunted to Platform 3 to allow easy loading and unloading of goods from the Kiriman Ekspres (KTM Distribution) office.",
            "It departs Singapore at 2230hrs the same day with the night train to KL, stopping at stations to pick up or drop off goods. Sometimes, 1 or 2 parcel vans are used, depending on the requirement."
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
          caption: "No automated ticket machines.  No store-valued electronic tickets either.",
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
      name: "Murals murals on the walls (of the Station)",
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
            "To properly show the beauty of the murals, these photographs have been post-processed in Photoshop to remove the \"keystoning\" (crooked, convergent) effect due to the angle from which these photographs were taken.",
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
      name: "Arrival Platform of the Station",
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
          title: "Train Number 26 \"Senandung Timuran\"， leaving the Tanjong Pagar Railway Station at around 6 pm",
          shotFrom: "from the 25th floor of 106 Spottiswoode Park Road",
          shotDate: "2010-11-18",
          caption: [
            "On leaving the Tanjong Pagar Railway Station, a Malaysia-bound train will first travel against the traffic flow for vehicles on Keppel Road before cruising alongside the Ayer Rajah Expressway in a northwesterly direction."
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
          title: "The 6 pm train, Train Number 14 \"Ekspres Timuran\" departing from Tanjong Pagar Railway Station",
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
          title: "Train Number 26 \"Senandung Timuran\" approaching the Kampong Bahru Flyover",
          shotFrom: "on Kampong Bahru Flyover",
          shotDate: "2010-08-01",
          caption: "The first bridge that a Malaysia-bound train passes is the Kampong Bahru Flyover.",
          imageUrl: "https://github.com/t-plusone/plus.one-photos/blob/main/P8010338.jpg?raw=true"
        },
        {
          id: 2,
          title: "",
          shotFrom: "on Kampong Bahru Flyover",
          shotDate: "2011-06-19",
          caption: "Train Number 26 \"Senandung Timuran\" approaching the Kampong Bahru Flyover about 3 minutes after departing from the Tanjong Pagar Railway Station.",
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
          title: "Train Number 26 \"Senandung Timuran\" approaching the Henderson Flyover",
          shotFrom: "on Henderson Flyover",
          shotDate: "2010-08-09",
          caption: [
            "After passing under the Kampong Bahru Flyover, a Malaysia-bound train goes under the Lower Delta Flyover before reaching the Henderson Flyover.",
            "As the train passes the Henderson Flyover approximately 6 minutes after leaving the Tanjong Pagar Railway Station, one can see the thirty-storey tall 17 Telok Blangah Crescent in the background."
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
          shotFrom: "from 17 Telok Blangah Crescent",
          shotDate: "2011-02-17",
          caption: [
            "A Tanjong Pagar-bound freight train passes under the Henderson Flyover. To the left lies the Telok Blangah HDB estate; to the right, the Henderson industrial area."
          ],
          imageUrl: "https://github.com/t-plusone/plus.one-photos/blob/main/P2170666.jpg?raw=true"
        }
      ]
    },
    {
      id: 30,
      name: "The Causeway",
      lat: 1.4502533,
      lng: 103.7700749,
      photos: [
        {
          id: 1,
          title: "The End",
          shotFrom: "from 215 Marsiling Lane",
          shotDate: "2010-12-13",
          caption: [
            "After departing the Woodlands Train Checkpoint, a Malaysia-bound train leaves Singapore via the Johor–Singapore Causeway.",
            "This photograph shows Train Number 2 \"Ekspres Rakyat\" leaving Singapore shortly after 9 o'clock in the morning."
          ],
          imageUrl: "https://github.com/t-plusone/plus.one-photos/blob/main/PC131745.jpg?raw=true"
        }
      ]
    }
  ];

  const mapBounds = ktmLocations.map(loc => [loc.lat, loc.lng]);

  // ✅ Home button: fit full journey, no extra zoom
  const resetToHome = () => {
    if (mapRef.current) {
      mapRef.current.fitBounds(mapBounds, { padding: [50, 50], animate: true });
      setTimeout(() => {
        mapRef.current.invalidateSize(); // fix grey tiles
      }, 300);
    }
  };

  // ✅ On first load: do exactly what Home button does
  useEffect(() => {
    const timer = setTimeout(() => {
      resetToHome();
    }, 400);
    return () => clearTimeout(timer);
  }, []);

 return (
  <div style={{
    backgroundColor: '#000',
    minHeight: '100vh',
    width: '100%',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    color: '#fff',
    padding: '0',
    margin: '0',
    overflowX: 'hidden'
  }}>
    {/* ✅ HEADER: full-width, outside containers */}
    <Header isHome={false} darkMode={true} />

    {/* ✅ INTRO: centered in 1200px */}
    <div style={{
      padding: '60px 32px 40px',
      maxWidth: '1200px',
      margin: '0 auto',
      boxSizing: 'border-box'
    }}>
       <h1 style={{ fontSize: '2.5rem', fontWeight: 400, textAlign: 'center', marginBottom: '16px', letterSpacing: '0.02em' }}>
          A Journey Till the End
        </h1>
        <div style={{ maxWidth: '800px', margin: '0 auto', lineHeight: 1.7, fontSize: '1.05rem' }}>
          <p>
            In May 2010, it was announced that from 1 July 2011, KTM (Keretapi Tanah Melayu) train services would depart from Woodlands instead of Tanjong Pagar Railway Station. KTM, or Malayan Railways, operated daily trains between Singapore and Malaysia, with Tanjong Pagar as its only station in Singapore.
          </p>
          <p>
            Tanjong Pagar Railway Station, built in 1932, would be “conserved given its historical significance.” Yet in Singapore, we know the word “conserve” often means repurposing or restricted access—much like the former National Library or Old Thong Chai Hospital.
          </p>
          <p>
            Although I had ridden KTM fewer than ten times in my life, I felt strongly that this marked the end of yet another legacy. Documentary photography has always been close to my heart. Singapore changes so quickly that I, as a photographer and a Son of this Land, have a moral obligation to preserve images of what will be gone forever.
          </p>
          <p>
            Thus my journey began at Tanjong Pagar Railway Station on a Thursday afternoon in June 2010. Over the next 360 days, I photographed KTM trains at publicly accessible locations across Singapore—from Tanjong Pagar to Woodlands and beyond. Every image was made with strict technical discipline: I composed each frame to include unmistakable symbols of Singapore—a road sign, an HDB block, familiar urban textures—so no photograph could be mistaken for Malaysia. I timed my shoots to avoid shooting into the sun and waited, sometimes for hours, to capture an approaching train (never its receding back).
          </p>
          <p style={{ marginTop: '24px', fontStyle: 'italic', fontWeight: 500, fontSize: '1.1rem' }}>
            This story ends with the last train’s departure from Tanjong Pagar on 30 June 2011. These images are not nostalgia—they are a testament to a vanishing chapter, preserved with care, precision, and respect.
          </p>
        </div>

    </div>


{/* ============ CENTERED MAP WITH LEFT PANEL ============ */}
<div style={{
  position: 'relative',
  padding: '0 32px 40px',
  boxSizing: 'border-box'
}}>
  {/* LEFT PANEL — positioned using calc() */}
  <div style={{
    position: 'absolute',
    top: '0',
    left: 'calc(50% - 600px - 240px)', // 600 = half of 1200px map, 240 = 220px panel + 20px gap
    width: '200px',
    backgroundColor: '#111',
    borderRight: '1px solid #333',
    overflowY: 'auto',
    padding: '20px 16px',
    borderRadius: '8px 0 0 8px',
    zIndex: 10,
    // Optional: for debugging
    // outline: '1px solid red'
  }}>
    <h3 style={{ fontSize: '1rem', fontWeight: 500, marginBottom: '16px', color: '#fff' }}>
      Locations
    </h3>
    {ktmLocations.map(location => (
      <button
        key={location.id}
        onClick={() => {
          if (mapRef.current) {
            mapRef.current.setView([location.lat, location.lng], 17, { animate: true });
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

  {/* CENTERED MAP — 1200px × 660px */}
  <div style={{
    width: '1200px',
    height: '660px',
    margin: '0 auto',
    borderRadius: '0 8px 8px 0',
    overflow: 'hidden',
    border: '1px solid #333',
    position: 'relative',
    zIndex: 1
  }}>
    <MapContainer
      ref={mapRef}
      center={[1.35, 103.82]}
      zoom={11}
      style={{ height: '100%', width: '100%' }}
      scrollWheelZoom={true}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {ktmLocations
  .slice()
  .sort((a, b) => a.id - b.id) // sort by ID: 1, 2, 3...
  .map((location) => (
    <Marker
      key={location.id}
      position={[location.lat, location.lng]}
      icon={createNumberedIcon(location.id)}
      zIndexOffset={10000 + (100 - location.id)} // ← ensures lower IDs appear on top
      eventHandlers={{
        click: () => {
          if (mapRef.current) {
            const z = mapRef.current.getZoom();
            mapRef.current.setView([location.lat, location.lng], Math.min(z + 6, 18), { animate: true });
          }
          setSelectedLocation(location);
        }
      }}
    />
  ))
}
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

      {/* ============ RIGHT SIDEBAR PANEL ============ */}
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
          <div style={{
            padding: '24px 32px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid #eee',
            flexShrink: 0
          }}>
            <h2 style={{
              fontSize: '1.3rem',
              fontWeight: 500,
              color: '#000',
              margin: 0,
              lineHeight: 1.3
            }}>
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
          <div style={{
            padding: '0 32px 32px',
            overflowY: 'auto',
            flex: 1
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', marginTop: '16px' }}>
              {selectedLocation.photos.map(photo => (
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
                  <h3 style={{
  fontSize: '1.15rem',
  fontWeight: 500,
  marginTop: '16px',
  marginBottom: '2px', // controls space below title
  color: '#000',
  lineHeight: 1.3
}}>
  {photo.title}
</h3>
{!photo.isComposite && (
  <p style={{
    fontSize: '0.95rem',
    color: '#666',
    fontStyle: 'italic',
    marginTop: '0',      // no top margin (title controls it)
    marginBottom: '8px',
    lineHeight: 1.4
  }}>
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
          marginTop: idx === 0 
            ? (photo.isComposite ? '8px' : '4px') 
            : '12px',
          marginBottom: isLast ? '16px' : '0', // ← space after last caption
          textAlign: isLong ? 'justify' : 'left',
          hyphens: isLong ? 'auto' : 'none',
          textJustify: isLong ? 'inter-word' : 'auto'
        }}
      >
        {para}
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
      marginBottom: '16px', // ← space after single caption
      textAlign: photo.caption?.length > 30 ? 'justify' : 'left',
      hyphens: photo.caption?.length > 30 ? 'auto' : 'none',
      textJustify: photo.caption?.length > 30 ? 'inter-word' : 'auto'
    }}
  >
    {photo.caption}
  </p>
)}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ============ LIGHTBOX ============ */}
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

// =============== PROJECT PAGE (FIXED) ===============
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
    <div style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      backgroundColor: 'white',
      color: '#1a1a1a',
      margin: 0,
      minHeight: '100vh'
    }}>
      {/* ✅ Header: full-width, outside containers */}
      <Header isHome={false} />

      {/* ✅ Centered content container (1500px) */}
      <main style={{
        padding: '60px 32px 40px',
        maxWidth: '1500px',
        margin: '0 auto',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 400, marginBottom: '30px', letterSpacing: '0.02em' }}>
          {project.title}
        </h1>
        <div style={{ marginBottom: '12px' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 500, marginBottom: '6px', color: '#666' }}>Project type</h2>
          <p style={{ color: '#1a1a1a' }}>{project.type}</p>
        </div>
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 500, marginBottom: '6px', color: '#666' }}>Location</h2>
          <p style={{ color: '#1a1a1a' }}>{project.location}</p>
        </div>
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 500, marginBottom: '6px', color: '#666' }}>Description</h2>
          {Array.isArray(project.description) ? (
            project.description.map((paragraph, index) => (
              <p key={index} style={{ color: '#1a1a1a', lineHeight: 1.6, marginBottom: index === project.description.length - 1 ? '0' : '16px' }}>
                {paragraph}
              </p>
            ))
          ) : (
            <p style={{ color: '#1a1a1a', lineHeight: 1.6 }}>{project.description}</p>
          )}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {project.images.map((imageData, index) => (
            <div key={index} onClick={() => openLightbox(imageData)} style={{ cursor: 'pointer', position: 'relative' }}>
              <img
                src={imageData.src}
                alt={imageData.caption}
                style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '4px' }}
                onContextMenu={e => e.preventDefault()}
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
                onMouseEnter={e => e.target.style.backgroundColor = 'rgba(0,0,0,0.1)'}
                onMouseLeave={e => e.target.style.backgroundColor = 'rgba(0,0,0,0)'}
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
// =============== ABOUT & CONTACT (unchanged) ===============
function AboutPage() {
  return (
    <div style={{ backgroundColor: 'white', minHeight: '100vh', color: '#1a1a1a' }}>
      <Header isHome={false} />
      <div style={{ padding: '60px 32px' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 400, marginBottom: '20px' }}>About</h1>
        <p style={{ fontSize: '1.1rem', lineHeight: 1.6, maxWidth: '800px' }}>
          plus.one is a travel and urbanscape photographer specializing in capturing the unique character of cities around the world. 
          With a keen eye for architectural details, urban geometry, and the interplay between built environments and natural elements, 
          each photograph tells a story of place, time, and human experience.
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
        <p style={{ fontSize: '1.1rem', lineHeight: 1.6, maxWidth: '800px' }}>
          For collaboration inquiries, print sales, or general questions, please reach out via email at contact@plusone.photos
        </p>
      </div>
    </div>
  );
}

// =============== MAIN APP ===============
function App() {
  return (
    <>
      <GlobalStyles />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/photo-documentaries" element={<PhotoDocumentariesPage />} />
          <Route path="/photo-documentaries/ktm-story" element={<KtmStoryMapPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/portfolio-collections/my-portfolio/:projectId" element={<ProjectPage />} />
        </Routes>
      </Router>
    </>
  );
}



export default App;