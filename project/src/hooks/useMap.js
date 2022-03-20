import {useEffect, useState} from 'react';
import leaflet from 'leaflet';

function useMap(mapRef, coordinates) {
  const [map, setMap] = useState(null);
  const [lat, lng] = coordinates;

  useEffect(() => {
    if (mapRef.current !== null && map === null) {
      const instance = leaflet.map(mapRef.current, {
        center: {
          lat,
          lng,
        },
        zoom: 10,
      });

      leaflet
        .tileLayer(
          'https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png',
          {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          },
        )
        .addTo(instance);

      setMap(instance);
    }
  }, [mapRef, map, lat, lng]);

  return map;
}

export default useMap;
