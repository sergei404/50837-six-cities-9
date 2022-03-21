import {useRef, useEffect} from 'react';
import useMap from '../../hooks/useMap';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  coordinates: number[][]
};

function Map({coordinates}: MapProps): JSX.Element {

  const mapRef = useRef(null);
  const map = useMap(mapRef, coordinates[0]);

  const URL_MARKER_DEFAULT = 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg';

  // const URL_MARKER_CURRENT = 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg';

  const defaultCustomIcon = leaflet.icon({
    iconUrl: URL_MARKER_DEFAULT,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  // const currentCustomIcon = leaflet.icon({
  //   iconUrl: URL_MARKER_CURRENT,
  //   iconSize: [40, 40],
  //   iconAnchor: [20, 40],
  // });

  useEffect(() => {
    if (map) {
      coordinates.forEach(([lat, lng]) => {
        leaflet
          .marker({
            lat,
            lng,
          }, {
            icon: defaultCustomIcon,
          })
          .addTo(map);
      });
    }
  }, [map, coordinates, defaultCustomIcon]);

  return (
    <section style={{height: '100vh'}} ref={mapRef} className="cities__map map"></section>
  );
}

export default Map;
