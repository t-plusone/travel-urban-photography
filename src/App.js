import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';

// Project data with photo-specific metadata
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
        caption: "Marina Bay Sands at sunset",
        metadata: [
          "Award: International Architecture Photography Prize 2023",
          "Featured in Urban Design Magazine",
          "Shot on Hasselblad X1D II"
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
      },
      {
        src: "https://github.com/t-plusone/plus.one-photos/blob/main/IMG_0367.jpg?raw=true",
        caption: "Singapore Central Business District",
        metadata: [
          "Commissioned for Singapore Tourism Board",
          "Published in National Geographic Travel"
        ]
      }
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
  },
  'project-title-3': {
    title: 'SkyMine HQ',
    type: 'Corporate Architecture',
    location: 'Shanghai, China',
    description: [
      'Documenting the futuristic SkyMine headquarters, showcasing innovative design and sustainable architecture in modern China.',
      'This corporate campus represents the cutting edge of sustainable urban development, featuring advanced environmental systems, renewable energy integration, and spaces designed to foster collaboration and innovation.',
      'The photographs capture both the grand scale of the architecture and the intimate human moments that occur within these spaces.'
    ],
    images: [
      {
        src: "https://github.com/t-plusone/plus.one-photos/blob/main/skymine.jpg?raw=true",
        caption: "SkyMine headquarters aerial view",
        metadata: [
          "Commissioned by SkyMine Corporation",
          "Winner: Corporate Architecture Photography Award 2024"
        ]
      },
      {
        src: "https://github.com/t-plusone/plus.one-photos/blob/main/skymine2.jpg?raw=true",
        caption: "Sustainable design elements",
        metadata: [
          "Featured in Green Building Journal",
          "Shot with drone photography"
        ]
      },
      {
        src: "https://github.com/t-plusone/plus.one-photos/blob/main/skymine3.jpg?raw=true",
        caption: "Interior collaborative spaces",
        metadata: [
          "Published in Interior Design Magazine",
          "Part of permanent corporate collection"
        ]
      }
    ]
  },
  'project-title-4': {
    title: 'Urban Reflections',
    type: 'Street Photography',
    location: 'Tokyo, Japan',
    description: [
      'Capturing the reflective surfaces and mirrored realities of Tokyo\'s urban environment, where glass and steel create endless visual poetry.',
      'Tokyo\'s dense urban fabric is filled with reflective surfaces that create complex visual layers. This series explores how these reflections transform and reinterpret the cityscape, often creating abstract compositions that challenge our perception of reality.'
    ],
    images: [
      {
        src: "https://github.com/t-plusone/plus.one-photos/blob/main/project4.jpg?raw=true",
        caption: "Shibuya crossing reflections",
        metadata: [
          "Winner: Tokyo Street Photography Contest 2023",
          "Exhibited at Ginza Photography Gallery"
        ]
      },
      {
        src: "https://github.com/t-plusone/plus.one-photos/blob/main/project4_2.jpg?raw=true",
        caption: "Rainy day glass facades",
        metadata: [
          "Featured in Japanese Photography Annual",
          "Shot during Tokyo's rainy season"
        ]
      },
      {
        src: "https://github.com/t-plusone/plus.one-photos/blob/main/project4_3.jpg?raw=true",
        caption: "Nighttime neon reflections",
        metadata: [
          "Limited edition prints available",
          "Commissioned for Tokyo Tourism campaign"
        ]
      }
    ]
  },
  'project-title-5': {
    title: 'Concrete Dreams',
    type: 'Brutalist Architecture',
    location: 'London, UK',
    description: [
      'An intimate study of London\'s brutalist architecture, finding beauty in raw concrete and geometric forms that define post-war urban planning.',
      'Brutalist architecture, often misunderstood and criticized, reveals its poetic qualities through careful observation. The weathering of concrete, the play of light and shadow on massive forms, and the human scale embedded within monumental structures all tell stories of a particular moment in architectural history.',
      'This series aims to celebrate rather than condemn, finding unexpected grace in what others might see as cold or imposing.'
    ],
    images: [
      {
        src: "https://github.com/t-plusone/plus.one-photos/blob/main/project5.jpg?raw=true",
        caption: "Barbican Estate geometric forms",
        metadata: [
          "Winner: UK Architecture Photography Prize 2023",
          "Acquired by Royal Institute of British Architects"
        ]
      },
      {
        src: "https://github.com/t-plusone/plus.one-photos/blob/main/project5_2.jpg?raw=true",
        caption: "Trellick Tower details",
        metadata: [
          "Exhibited at London Architecture Festival",
          "Shot with medium format film"
        ]
      },
      {
        src: "https://github.com/t-plusone/plus.one-photos/blob/main/project5_3.jpg?raw=true",
        caption: "Southbank Centre textures",
        metadata: [
          "Published in Concrete Architecture Quarterly",
          "Part of Brutalist Britain touring exhibition"
        ]
      }
    ]
  },
  'project-title-6': {
    title: 'Vertical Horizons',
    type: 'Skyline Photography',
    location: 'New York, USA',
    description: [
      'Exploring New York City\'s iconic skyline from unique vantage points, capturing the vertical rhythm of America\'s most famous urban landscape.',
      'New York\'s skyline is constantly evolving, with new towers rising alongside historic landmarks. This series captures the city at different times of day and in various weather conditions, revealing the ever-changing character of this vertical metropolis.',
      'Each photograph seeks to capture not just the physical structures, but the energy and ambition that built them.'
    ],
    images: [
      {
        src: "https://github.com/t-plusone/plus.one-photos/blob/main/project6.jpg?raw=true",
        caption: "Manhattan skyline at dawn",
        metadata: [
          "Winner: New York Photography Awards 2024",
          "Featured in The New Yorker magazine"
        ]
      },
      {
        src: "https://github.com/t-plusone/plus.one-photos/blob/main/project6_2.jpg?raw=true",
        caption: "Brooklyn Bridge perspective",
        metadata: [
          "Exhibited at MoMA Photography Exhibition",
          "Shot from Brooklyn Heights"
        ]
      },
      {
        src: "https://github.com/t-plusone/plus.one-photos/blob/main/project6_3.jpg?raw=true",
        caption: "Empire State Building storm",
        metadata: [
          "Published in National Geographic",
          "Captured during winter storm system"
        ]
      }
    ]
  }
};

// Lightbox Component
function Lightbox({ isOpen, onClose, image, caption, metadata }) {
  if (!isOpen) return null;

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
        padding: '20px'
      }}
      onClick={onClose}
    >
      <div 
        style={{
          display: 'flex',
          maxWidth: '1500px',
          maxHeight: '90vh',
          backgroundColor: 'white',
          borderRadius: '8px',
          overflow: 'hidden',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            fontSize: '18px',
            cursor: 'pointer',
            zIndex: 1001,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          ×
        </button>

        {/* Image Section */}
        <div style={{ 
          flex: 2, 
          minWidth: '400px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px'
        }}>
          <img 
            src={image}
            alt={caption}
            style={{
              maxWidth: '100%',
              maxHeight: '70vh',
              objectFit: 'contain',
              borderRadius: '4px'
            }}
          />
        </div>

        {/* Info Section */}
        <div style={{ 
          flex: 1, 
          minWidth: '300px',
          padding: '20px',
          overflowY: 'auto',
          maxHeight: '90vh'
        }}>
          <h3 style={{ 
            fontSize: '1.2rem', 
            fontWeight: 500, 
            marginBottom: '16px',
            color: '#1a1a1a'
          }}>
            {caption}
          </h3>
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '8px' 
          }}>
            {metadata.map((item, index) => (
              <div 
                key={index}
                style={{
                  padding: '8px 12px',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '4px',
                  fontSize: '0.9rem',
                  color: '#495057'
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

// Navigation Component
function Navigation({ isHome }) {
  const color = isHome ? 'white' : '#1a1a1a';
  
  return (
    <nav className="desktop-menu">
      <Link 
        to="/portfolio" 
        style={{ 
          marginLeft: '32px', 
          textDecoration: 'none', 
          color: color, 
          opacity: 0.9, 
          fontSize: '0.95rem', 
          fontWeight: 400 
        }}
      >
        portfolio
      </Link>
      <Link 
        to="/about" 
        style={{ 
          marginLeft: '32px', 
          textDecoration: 'none', 
          color: color, 
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
          color: color, 
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

// Mobile Menu Component
function MobileMenu({ isHome, isOpen, onClose }) {
  const color = isHome ? 'white' : '#1a1a1a';
  const bgColor = isHome ? 'rgba(0,0,0,0.9)' : 'white';
  const borderColor = isHome ? undefined : '1px solid #e5e5e5';
  
  if (!isOpen) return null;
  
  return (
    <div style={{ 
      position: 'absolute', 
      top: '70px', 
      right: '32px',
      backgroundColor: bgColor,
      padding: '16px',
      borderRadius: '8px',
      zIndex: 9,
      border: borderColor
    }}>
      <Link 
        to="/portfolio" 
        style={{ 
          display: 'block', 
          textDecoration: 'none', 
          color: color, 
          opacity: 0.9, 
          marginBottom: '12px', 
          fontSize: '0.95rem', 
          fontWeight: 400 
        }}
        onClick={onClose}
      >
        portfolio
      </Link>
      <Link 
        to="/about" 
        style={{ 
          display: 'block', 
          textDecoration: 'none', 
          color: color, 
          opacity: 0.9, 
          marginBottom: '12px', 
          fontSize: '0.95rem', 
          fontWeight: 400 
        }}
        onClick={onClose}
      >
        about
      </Link>
      <Link 
        to="/contact" 
        style={{ 
          display: 'block', 
          textDecoration: 'none', 
          color: color, 
          opacity: 0.9, 
          fontSize: '0.95rem', 
          fontWeight: 400 
        }}
        onClick={onClose}
      >
        contact
      </Link>
    </div>
  );
}

// Logo Component
function Logo() {
  return (
    <Link to="/">
      <img 
        src="https://github.com/t-plusone/plus.one-photos/blob/main/plusone_logo%202_13x6.png?raw=true" 
        alt="plus.one"
        style={{ width: '130px', height: '60px', objectFit: 'contain' }}
      />
    </Link>
  );
}

// Header Component
function Header({ isHome }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerBg = isHome ? 'rgba(0, 0, 0, 0.20)' : 'transparent';
  const buttonColor = isHome ? 'white' : '#1a1a1a';
  
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
      <div>
        <Logo />
      </div>
      
      <Navigation isHome={isHome} />

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
        isOpen={menuOpen} 
        onClose={() => setMenuOpen(false)} 
      />
    </header>
  );
}

// Homepage Component - Hero photo with centered text
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
        backgroundImage: `url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
      }}>
        {/* Dark overlay for text readability */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.15)'
        }} />
        
        <Header isHome={true} />

        {/* Hero Text - Your brand name and subheading */}
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
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.9)'
          }}>
            plus.one
          </h1>
          <p style={{ 
            fontSize: 'clamp(1rem, 5vw, 1.5rem)',
            fontWeight: 300,
            letterSpacing: '0.2em',
            lineHeight: 1.2,
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.9)'
          }}>
            travel & urbanscape photographer
          </p>
        </div>
      </div>
    </div>
  );
}

// Portfolio Page Component - Logo left, navigation right in black
function PortfolioPage() {
  const projects = [
    { 
      id: 'sg-urbanscape', 
      title: 'singapore urbanscape', 
      image: "https://github.com/t-plusone/plus.one-photos/blob/main/IMG_0365.jpg?raw=true" 
    },
    { 
      id: 'sychedelic', 
      title: 'sychedelic southerncross station', 
      image: "https://github.com/t-plusone/plus.one-photos/blob/main/_DSF5939.jpg?raw=true" 
    },
    //{ 
    //  id: 'project-title-3', 
    //  title: 'SkyMine HQ', 
    //  image: "https://github.com/t-plusone/plus.one-photos/blob/main/skymine.jpg?raw=true" 
    //},
    //{ 
    //  id: 'project-title-4', 
    //  title: 'Urban Reflections', 
    //  image: "https://github.com/t-plusone/plus.one-photos/blob/main/project4.jpg?raw=true" 
    //},
    //{ 
    //  id: 'project-title-5', 
    //  title: 'Concrete Dreams', 
    //  image: "https://github.com/t-plusone/plus.one-photos/blob/main/project5.jpg?raw=true" 
    //},
    //{ 
    //  id: 'project-title-6', 
    //  title: 'Vertical Horizons', 
    //  image: "https://github.com/t-plusone/plus.one-photos/blob/main/project6.jpg?raw=true" 
    //}
  ];

  return (
    <div style={{ 
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      backgroundColor: 'white',
      color: '#1a1a1a',
      margin: 0,
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Header isHome={false} />

      <main style={{ 
        flex: 1,
        padding: '60px 32px 40px',
        display: 'flex',
        flexDirection: 'column'
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

        {/* Two-column photo grid */}
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '24px',
          maxWidth: '1500px',
          margin: '0 auto',
          width: '100%'
        }}>
          {projects.map((project, index) => (
            <Link 
              key={index} 
              to={`/portfolio-collections/my-portfolio/${project.id}`}
              style={{ 
                display: 'block',
                textDecoration: 'none',
                width: '100%'
              }}
            >
              <img 
                src={project.image}
                alt={project.title}
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  borderRadius: '4px'
                }}
                onContextMenu={(e) => e.preventDefault()}
              />
              <div style={{ 
                textAlign: 'center', 
                fontSize: '0.95rem', 
                fontWeight: 400, 
                marginTop: '12px',
                color: '#1a1a1a',
                //textTransform: 'capitalize'
              }}>
                {project.title}
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

// Project Page Component with dynamic content and lightbox
function ProjectPage() {
  const { projectId } = useParams();
  const project = projectData[projectId] || projectData['sg-urbanscape']; // fallback to first project if not found
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
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Header isHome={false} />

      <main style={{ 
        flex: 1,
        padding: '60px 32px 40px',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <h1 style={{ 
          fontSize: '2.5rem',
          fontWeight: 400,
          marginBottom: '30px',
          letterSpacing: '0.02em'
        }}>
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

        {/* Project Images Gallery - Single column, full width */}
        <div style={{ 
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          maxWidth: '1500px',
          margin: '0 auto',
          width: '100%'
        }}>
          {project.images.map((imageData, index) => (
            <div 
              key={index}
              onClick={() => openLightbox(imageData)}
              style={{
                cursor: 'pointer',
                position: 'relative'
              }}
            >
              <img 
                src={imageData.src}
                alt={imageData.caption}
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  borderRadius: '4px',
                  objectFit: 'cover'
                }}
                onContextMenu={(e) => e.preventDefault()}
              />
              {/* Hover overlay to indicate clickability */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0)',
                borderRadius: '4px',
                transition: 'background-color 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.1)'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(0, 0, 0, 0)'}
              />
            </div>
          ))}
        </div>
      </main>

      {/* Lightbox */}
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

// About and Contact pages (minimal)
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

// Main App
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/portfolio-collections/my-portfolio/:projectId" element={<ProjectPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </Router>
  );
}

export default App;
