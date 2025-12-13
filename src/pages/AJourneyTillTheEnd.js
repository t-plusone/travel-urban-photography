// src/pages/KtmStoryMap.js
import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet'; // Needed for icon fix if using the script above is not preferred
import 'leaflet/dist/leaflet.css';

// Optional: Define custom marker icon if the default one doesn't load correctly
// const customIcon = L.icon({
//   iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
// });

// Sample data structure for your photos
// You will replace this with your actual photo data from 2010-2011
const photoMarkers = [
  {
    id: 1,
    position: [1.2727939,103.8379301], // Tanjong Pagar Railway Station
    date: 'June 2010',
    title: 'Tanjong Pagar Station',
    description: 'The familiar platform, still bustling, yet under the shadow of change.',
    imageUrl: '/images/ktm/001-P2090545.jpg', // Replace with actual image path
  },
  {
    id: 2,
    position: [1.2751553,103.8291078], // Same location for another shot
    date: 'July 2010',
    title: 'KTM Train leaving Tg Pagar Station',
    description: 'Taken on Kampong Bahru Flyover',
    imageUrl: '/images/ktm/030-P8010338.jpg',
  },
  //{
  //  id: 3,
  //  position: [1.4358, 103.7860], // Woodlands Checkpoint (for context)
  //  date: 'August 2010',
  //  title: 'Future Hub: Woodlands',
  //  description: 'The new departure point, a stark contrast to the old.',
  //  imageUrl: '/path/to/your/photo3.jpg',
  },
  // Add more markers as needed
];

const KtmStoryMap = () => {
  // Set the initial view to Singapore, centered on Tanjong Pagar
  const mapCenter = [1.2839, 103.8323];
  const zoomLevel = 14;

  // Optional: Function to create a custom popup component if needed
  // const PhotoPopup = ({ photo }) => (
  //   <div>
  //     <img src={photo.imageUrl} alt={photo.title} style={{ width: '100%', height: 'auto' }} />
  //     <h3>{photo.title}</h3>
  //     <p><strong>Date:</strong> {photo.date}</p>
  //     <p>{photo.description}</p>
  //   </div>
  // );

  return (
    <div className="ktm-story-container" style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>A Journey Till The End</h1>
      <h2>The Last Days of Tanjong Pagar Railway Station</h2>
      <p style={{ fontStyle: 'italic', maxWidth: '800px', margin: '0 auto 20px' }}>
        "Thus my journey began at Tanjong Pagar Railway Station on a Thursday afternoon in June 2010… 
         I, as a photographer and a Son of this Land, have the moral obligations to our future generations 
         to preserve images of Singapore that will be gone forever."
      </p>

      <div className="map-wrapper" style={{ height: '60vh', width: '100%', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
        <MapContainer center={mapCenter} zoom={zoomLevel} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" // Standard OSM
            url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.png" // A more subtle, map-like style
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles courtesy of <a href="http://stamen.com">Stamen Design</a>'
          />
          {photoMarkers.map((photo) => (
            <Marker
              key={photo.id}
              position={photo.position}
              // icon={customIcon} // Use if default icon fails
            >
              <Popup>
                <div style={{ maxWidth: '300px' }}>
                  <img src={photo.imageUrl} alt={photo.title} style={{ width: '100%', height: 'auto', borderRadius: '4px' }} />
                  <h3 style={{ margin: '8px 0 4px 0' }}>{photo.title}</h3>
                  <p style={{ margin: '4px 0', color: '#666' }}><strong>Date:</strong> {photo.date}</p>
                  <p style={{ margin: '4px 0' }}>{photo.description}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <div style={{ marginTop: '20px', maxWidth: '800px', margin: '20px auto' }}>
        <p>
          This map documents the final operational years of the KTM train service from Tanjong Pagar Railway Station, 
          which ceased on 1 July 2011. The station, built in 1932, was conserved but relocated services to Woodlands, 
          marking the end of an era deeply connected to Singapore's history and the lives of many commuters.
        </p>
      </div>
    </div>
  );
};

export default KtmStoryMap;