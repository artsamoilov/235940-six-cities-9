import {useRef, useEffect} from 'react';
import {Icon, Marker} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {OfferType, CityType} from '../../types/offer-type';
import useMap from '../../hooks/use-map/use-map';

type PropsType = {
  offers: OfferType[],
  city: CityType,
  selectedOffer: OfferType | undefined,
}

const defaultIcon = new Icon({
  iconUrl: 'img/pin.svg',
  iconSize: [27, 39],
  iconAnchor: [13, 39],
});

const activeIcon = new Icon({
  iconUrl: 'img/pin-active.svg',
  iconSize: [27, 39],
  iconAnchor: [13, 39],
});

export default function Map({offers, city, selectedOffer}: PropsType): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city.location);

  useEffect(() => {
    if (map) {
      offers.forEach(({id, location}) => {
        const marker = new Marker({
            lat: location.latitude,
            lng: location.longitude,
          });

        marker.setIcon(selectedOffer && selectedOffer.id === id ? activeIcon : defaultIcon).addTo(map);
      });
    }
  }, [map, offers, selectedOffer]);

  return <div style={{height: '100%'}} ref={mapRef} />
}
