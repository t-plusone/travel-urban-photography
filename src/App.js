// React & core
import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';

// Leaflet JS
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon } from 'leaflet';

// Leaflet CSS
import "leaflet/dist/leaflet.css";
import L from 'leaflet';

function createNumberedIcon(number) {
  return L.divIcon({
    className: 'numbered-marker',
    html: `<div style="
      background: #1a1a1a;
      color: white;
      border-radius: 50%;
      width: 24px;
      height: 24px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 12px;
      font-weight: bold;
      box-shadow: 0 2px 6px rgba(0,0,0,0.3);
      border: 2px solid white;
    ">${number}</div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
}

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
        src: "https://github.com/t-plusone/plus.one-photos/blob/main/_DSF4459b.jpg?raw=true",
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
        src: "https://github.com/t-plusone/plus.one-photos/blob/main/_DSF5951.jpg?raw=true",
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

// =============== MOBILE MENU (updated) ===============
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
  const headerBg = isHome ? 'rgba(0, 0, 0, 0.20)' : 'transparent';
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
  const heroImage = "https://github.com/t-plusone/plus.one-photos/blob/main/splash%20photo%20a.jpg?raw=true";
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
          backgroundColor: 'rgba(0, 0, 0, 0.15)' 
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
          position: 'relative', 
          zIndex: 5 
        }}>
          {/* ✅ Split-color "plusone" */}
          <h1 style={{ 
  fontSize: 'clamp(2rem, 8vw, 3rem)', 
  fontWeight: 300, 
  marginBottom: '1rem', 
  letterSpacing: '0.05em', 
  lineHeight: 1.2,
  textShadow: '2px 2px 4px rgba(0,0,0,0.9)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}}>
  <span style={{ color: 'white' }}>plus</span>
  <span style={{ color: '#aaa' }}>one</span>
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
      coverImage: 'https://github.com/t-plusone/plus.one-photos/blob/main/030-P8010338.jpg?raw=true'
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
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const mapRef = useRef();

  const openLightbox = (photo) => {
    setSelectedPhoto(photo);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setSelectedPhoto(null);
  };

  // Format date: "2010-11-18" → "18 November 2010"
  function formatDate(isoDate) {
    const date = new Date(isoDate);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }

  // --- Numbered Marker Icon ---
  function createNumberedIcon(number) {
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
      ">${number}</div>`,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
    });
  }

  // --- Photo Locations ---
  const ktmLocations = [
    {
      id: 1,
      name: "Tanjong Pagar Railway Station",
      lat: 1.2727939,
      lng: 103.8379301,
      photos: [
        {
          id: 1,
          title: "Tanjong Pagar Railway Station",
          shotFrom: "Tanjong Pagar Railway Station carpark",
          shotDate: "2011-02-09",
          caption: "Built in 1932, the Tanjong Pagar Railway Station is the showpiece of the KTM Railway System within Singapore and is located along Keppel Road.",
          imageUrl: "https://github.com/t-plusone/plus.one-photos/blob/main/001-P2090545.jpg?raw=true"
        },
        {
          id: 2,
          title: "Fencing on the North side of the Railway Station",
          shotFrom: "North side of the Station",
          shotDate: "2010-11-18",
          caption: "On the north side of the Railway Station, there is a side entrance into the Station compound from Spottiswoode Park Road. The fencing on this side of the Station looks simple and easily penetrable - in total contrast with the high-security fencing found in Singapore's governmental buildings. I am reminded of the simplicity and innocence of an age gone by.",
          imageUrl: "https://github.com/t-plusone/plus.one-photos/blob/main/004-PB180854.jpg?raw=true"
        }
      ]
    },
    {
      id: 2,
      name: "Kampong Bahru Flyover",
      lat: 1.275092, 
      lng: 103.829083,
      photos: [
        {
          id: 3,
          title: "On the Kampong Bahru Flyover",
          shotFrom: "Kampong Bahru Flyover pedestrian walkway",
          shotDate: "2010-08-01",
          caption: "The first bridge that a Malaysia-bound train passes was the Kampong Bahru Flyover.",
          imageUrl: "https://github.com/t-plusone/plus.one-photos/blob/main/030-P8010338.jpg?raw=true"
        }
      ]
    },
    {
      id: 3,
      name: "The Causeway",
      lat: 1.4476076,
      lng: 103.7720621,
      photos: [
        {
          id: 4,
          title: "The End",
          shotFrom: "215 Marsiling Lane",
          shotDate: "2010-12-13",
          caption: "After departing the Woodlands Train Checkpoint, a Malaysia-bound train leaves Singapore via the Johor–Singapore Causeway.",
          imageUrl: "https://github.com/t-plusone/plus.one-photos/blob/main/070-PC131745.jpg?raw=true"
        }
      ]
    }
  ];

  // Compute map bounds for full journey
  const mapBounds = ktmLocations.map(loc => [loc.lat, loc.lng]);

  // Reset to full journey view
  const resetToHome = () => {
    if (mapRef.current) {
      mapRef.current.fitBounds(mapBounds, { padding: [50, 50], animate: true });
    }
  };

return (
  <div style={{ 
    backgroundColor: '#000',
    minHeight: '100vh',
    width: '100%',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    color: '#fff',
    padding: '0',
    margin: '0'
  }}>
    {/* ✅ Header stays full-width, same as all other pages */}
    <Header isHome={false} darkMode={true} />

    {/* ✅ Only content is centered and constrained */}
    <div style={{ 
      padding: '60px 32px 40px', 
      maxWidth: '1200px', 
      margin: '0 auto',
      boxSizing: 'border-box'
    }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 400, textAlign: 'center', marginBottom: '16px', letterSpacing: '0.02em' }}>
        A Journey Till the End
      </h1>

        {/* Narrative — EXACT BLOG TEXT */}
        <div style={{ maxWidth: '800px', margin: '0 auto', lineHeight: 1.7, fontSize: '1.05rem' }}>
          <p>
            In May 2010, it was announced that from 1 July 2011, KTM train services from Singapore will depart from Woodlands instead of Tanjong Pagar Railway Station. KTM stands for Keretapi Tanah Melayu, which means Malayan Railways. Everyday, it operates a few train trips between Singapore and many parts of Malaysia. Tanjong Pagar Railway Station is KTM’s only station in Singapore.
          </p>
          <p>
            Tanjong Pagar Railway Station, built in 1932, will then be “conserved given its historical significance. It will also be the centrepiece for the proposed new development on this site.” (ChannelNewsAsia, 24 May 2010) We in Singapore know that the word “conserve” can only mean one of two things: 1) The building will be given a new coat of paint and some renovations and it will be leased or sold to the highest bidder who will convert it to a restaurant, a pub, a shopping mall, a discotheque or a residential property (quite unlikely for this case though); or 2) The building will be given to some government entity (e.g. Ministry of Foreign Affairs, etc.) and the place will become out of bounds to the general public.
          </p>
          <p>
            Following the announcement, my immediate thoughts were that it might suffer the same fate that had beset on other historical buildings in Singapore such as the former National Library at Stamford Road (demolished) and Old Thong Chai Hospital (since 1990s, it has existed as a nightclub, a few restaurants and others at different times).
          </p>
          <p>
            Although I had only commuted on KTM trains not more than 10 times in my 39 years of life, I nonetheless felt strongly that this will mark the end of yet another legacy in Singapore. Documentary Photography has always been close to my heart, especially so in the past couple of years. Singapore has changed so much and is still changing so quickly that I firmly believe that I, as a photographer and a Son of this Land, have the moral obligations to our future generations to preserve images of Singapore that will be gone forever.
          </p>
          <p>
            Thus my journey began at Tanjong Pagar Railway Station on a Thursday afternoon in June 2010…
          </p>
        </div>

        {/* MAP WITH HOME BUTTON */}
        <div style={{ 
          height: '500px', 
          marginTop: '40px', 
          marginBottom: '40px', 
          borderRadius: '8px', 
          overflow: 'hidden', 
          border: '1px solid #333',
          position: 'relative'
        }}>
          <MapContainer 
            ref={mapRef}
            bounds={mapBounds}
            boundsOptions={{ padding: [50, 50] }}
            style={{ height: '100%', width: '100%' }}
            scrollWheelZoom={true}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {ktmLocations.map((location) => (
              <Marker
                key={location.id}
                position={[location.lat, location.lng]}
                icon={createNumberedIcon(location.id)}
                eventHandlers={{
  click: () => {
    if (mapRef.current) {
      const currentZoom = mapRef.current.getZoom();
      const targetZoom = Math.min(currentZoom + 6, 18); 
      mapRef.current.setView([location.lat, location.lng], targetZoom, { animate: true });
    }
  }
}}
              >
                <Popup
                  maxWidth={450}
                  maxHeight={400}
                >
                  <div>
                    <h4 style={{ margin: '0 0 12px 0', fontSize: '1.1rem', fontWeight: 500, color: '#000' }}>
                      {location.name}
                    </h4>
                    <div style={{ 
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '10px',
                      justifyContent: 'center',
                      padding: '8px 0'
                    }}>
                      {location.photos.map(photo => (
                        <img 
                          key={photo.id}
                          src={photo.imageUrl.trim()}
                          alt={photo.title}
                          style={{ 
                            width: '100px',
                            height: 'auto',
                            maxHeight: '120px',
                            objectFit: 'contain',
                            backgroundColor: '#000',
                            borderRadius: '4px',
                            cursor: 'pointer'
                          }}
                          onClick={() => openLightbox(photo)}
                        />
                      ))}
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
          
          {/* Home Button */}
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

        {/* LIGHTBOX */}
        {selectedPhoto && (
          <div 
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.9)', zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px', overflow: 'auto' }}
            onClick={closeLightbox}
          >
            <div 
              style={{
                backgroundColor: 'white',
                borderRadius: '8px',
                overflow: 'hidden',
                position: 'relative',
                width: '100%',
                display: 'flex',
                flexDirection: window.innerWidth <= 768 ? 'column' : 'row',
                maxWidth: window.innerWidth <= 768 ? '95vw' : '1200px'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={closeLightbox} style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(0,0,0,0.7)', color: 'white', border: 'none', borderRadius: '50%', width: '32px', height: '32px', fontSize: '18px', cursor: 'pointer' }}>×</button>
              
              <div style={{ 
                width: '100%',
                padding: window.innerWidth <= 768 ? '16px' : '20px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                ...(window.innerWidth > 768 ? { flex: 2, minWidth: '400px' } : {})
              }}>
                <img 
                  src={selectedPhoto.imageUrl.trim()}
                  alt={selectedPhoto.caption}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '70vh',
                    height: 'auto',
                    width: 'auto',
                    objectFit: 'contain',
                    borderRadius: '4px'
                  }}
                />
              </div>

              <div style={{ 
                width: '100%',
                padding: window.innerWidth <= 768 ? '0 16px 16px' : '20px',
                ...(window.innerWidth > 768 ? { flex: 1, minWidth: '300px' } : {})
              }}>
                <h3 style={{ fontSize: window.innerWidth <= 768 ? '1rem' : '1.2rem', fontWeight: 500, marginBottom: '8px', color: '#1a1a1a' }}>
                  {selectedPhoto.title}
                </h3>
                <p style={{ 
                  fontSize: '0.95rem', 
                  color: '#666', 
                  marginBottom: '12px',
                  fontStyle: 'italic'
                }}>
                  Photographed from {selectedPhoto.shotFrom} on {formatDate(selectedPhoto.shotDate)}.
                </p>
                <p style={{ color: '#495057', lineHeight: 1.6, fontSize: '1rem' }}>
                  {selectedPhoto.caption}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// =============== PROJECT PAGE (unchanged) ===============
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
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', backgroundColor: 'white', color: '#1a1a1a', margin: 0, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header isHome={false} />
      <main style={{ flex: 1, padding: '60px 32px 40px', display: 'flex', flexDirection: 'column' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 400, marginBottom: '30px', letterSpacing: '0.02em' }}>{project.title}</h1>
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
              <p key={index} style={{ color: '#1a1a1a', lineHeight: 1.6, marginBottom: index === project.description.length - 1 ? '0' : '16px' }}>{paragraph}</p>
            ))
          ) : (
            <p style={{ color: '#1a1a1a', lineHeight: 1.6 }}>{project.description}</p>
          )}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '1500px', margin: '0 auto', width: '100%' }}>
          {project.images.map((imageData, index) => (
            <div key={index} onClick={() => openLightbox(imageData)} style={{ cursor: 'pointer', position: 'relative' }}>
              <img src={imageData.src} alt={imageData.caption} style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '4px' }} onContextMenu={e => e.preventDefault()} />
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0)', borderRadius: '4px', transition: 'background-color 0.3s ease' }}
                onMouseEnter={e => e.target.style.backgroundColor = 'rgba(0,0,0,0.1)'}
                onMouseLeave={e => e.target.style.backgroundColor = 'rgba(0,0,0,0)'}
              />
            </div>
          ))}
        </div>
      </main>
      {selectedImage && <Lightbox isOpen={lightboxOpen} onClose={closeLightbox} image={selectedImage.src} caption={selectedImage.caption} metadata={selectedImage.metadata} />}
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
  );
}



export default App;