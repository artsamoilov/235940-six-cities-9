import {useRef, useEffect} from 'react';
import leaflet, {Icon, Marker} from 'leaflet';
import {OfferType} from '../../types/offer-type';
import {useAppSelector} from '../../hooks';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/use-map/use-map';
import {PARIS, Cities} from '../../mocks/cities';

type PropsType = {
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

export default function Map({selectedOffer}: PropsType): JSX.Element {
  const {cityName, offers} = useAppSelector((state) => state);

  const getCityLocation = (currentCityName: string) => {
    const city = Cities.find(({name}) => name === currentCityName);
    return city ? city.location : PARIS.location;
  };

  const location = getCityLocation(cityName);
  const mapRef = useRef(null);
  const map = useMap(mapRef, location);
  const markerGroup = leaflet.layerGroup();

  useEffect(() => {
    if (map) {
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        });

        marker.setIcon(selectedOffer && selectedOffer.id === offer.id ? activeIcon : defaultIcon).addTo(markerGroup);
        markerGroup.addTo(map);
      });
    }
    return () => {
      markerGroup.clearLayers();
    };
  }, [map, markerGroup, offers, selectedOffer]);

  return <div style={{height: '100%'}} ref={mapRef} />;
}
