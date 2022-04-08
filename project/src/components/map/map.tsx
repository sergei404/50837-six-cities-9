import {useRef, useEffect} from 'react';
import useMap from '../../hooks/useMap';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {Location} from './../../types/offerType';


type MapProps = {
  coordinates: {location: Location, id: number, isSelected?: boolean}[];
  selectedPoint: number | null;
};

function Map({coordinates, selectedPoint}: MapProps): JSX.
Element {

  const mapRef = useRef(null);
  const map = useMap(mapRef, coordinates[0]);

  const URL_MARKER_DEFAULT = 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg';

  const URL_MARKER_CURRENT = 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg';

  const defaultCustomIcon = leaflet.icon({
    iconUrl: URL_MARKER_DEFAULT,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const currentCustomIcon = leaflet.icon({
    iconUrl: URL_MARKER_CURRENT,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });
  const coords = coordinates.map(({location: {latitude: lat, longitude: lng}, id, isSelected}) => {
    const marker = new leaflet.Marker({lat, lng},
      {
        // eslint-disable-next-line no-nested-ternary
        icon: id === selectedPoint ?
          currentCustomIcon :
          isSelected ?
            currentCustomIcon :
            defaultCustomIcon,
      });
    return marker;
  });

  useEffect(() => {
    const groupMarkers = leaflet.layerGroup(coords);

    if (map) {
      map.setView({lat: coordinates[0].location.latitude, lng: coordinates[0].location.longitude});
      groupMarkers.addTo(map);

      return () => {
        map.removeLayer(groupMarkers);
      };
    }
  }, [map, coords, coordinates]);

  return (
    <section style={{height: '100vh'}} ref={mapRef} className="cities__map map"></section>
  );
}

export default Map;
