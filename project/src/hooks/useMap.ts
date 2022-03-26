import { MutableRefObject, useEffect, useState} from 'react';
import leaflet, {Map} from 'leaflet';
import {Location} from './../types/offerType';

function useMap(mapRef:  MutableRefObject<null>, coordinates: {location: Location, id: number}) {
  const [map, setMap] = useState<Map | null>(null);

  useEffect(() => {
    if (mapRef.current !== null && map === null) {
      const instance = leaflet.map(mapRef.current, {
        center: {
          lat: coordinates.location.latitude,
          lng: coordinates.location.longitude,
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
  }, [mapRef, map, coordinates]);

  return map;
}

export default useMap;
