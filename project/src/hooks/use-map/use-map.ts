import {useEffect, useState, MutableRefObject} from 'react';
import leaflet from 'leaflet';
import {CityType} from '../../types/offer-type';
import {Cities} from '../../mocks/cities';

export default function useMap(mapRef: MutableRefObject<HTMLElement | null>, currentCity: CityType): leaflet.Map | null {
  const [map, setMap] = useState<leaflet.Map | null>(null);

  const moveToCity = (city: CityType | undefined, currentMap: leaflet.Map) => {
    if (city) {
      currentMap.flyTo({
        lat: city.location.latitude,
        lng: city.location.longitude,
      },
      city.location.zoom,
      );
    }
  };

  useEffect(() => {
    if (mapRef.current !== null && map === null && currentCity.location) {
      const instance = leaflet.map(mapRef.current, {
        center: {
          lat: currentCity.location.latitude,
          lng: currentCity.location.longitude,
        },
        zoom: currentCity.location.zoom,
      });

      leaflet.tileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        },
      ).addTo(instance);

      setMap(instance);
    }
    if (map) {
      const newCity = Cities.find(({name}) => name === currentCity.name);
      moveToCity(newCity, map);
    }
  }, [mapRef, map, currentCity]);

  return map;
}
