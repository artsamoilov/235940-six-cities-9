import {useRef, useEffect} from 'react';
import leaflet, {Icon, Marker} from 'leaflet';
import {OfferType} from '../../types/offer-type';
import {useAppSelector} from '../../hooks';
import {PARIS, Cities} from '../../const';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/use-map/use-map';

type PropsType = {
  selectedOffer: OfferType | undefined,
  offers: OfferType[],
  isInteractive?: boolean,
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

export default function MainMap({selectedOffer, offers, isInteractive = true}: PropsType): JSX.Element {
  const cityName = useAppSelector(({VIEW}) => VIEW.cityName);
  const currentCityOffers = offers.filter(({city}) => city.name === cityName);

  const getCurrentCity = (currentCityName: string) => {
    const city = Cities.find(({name}) => name === currentCityName);
    return city ? city : PARIS;
  };

  const currentCity = getCurrentCity(cityName);
  const mapRef = useRef(null);
  const map = useMap(mapRef, currentCity);
  const markerGroup = leaflet.layerGroup();

  useEffect(() => {
    if (map) {
      currentCityOffers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        });
        marker.setIcon(selectedOffer && selectedOffer.id === offer.id ? activeIcon : defaultIcon).addTo(markerGroup);
      });

      if (!isInteractive && selectedOffer) {
        const currentMarker = new Marker({
          lat: selectedOffer.location.latitude,
          lng: selectedOffer.location.longitude,
        });
        currentMarker.setIcon(activeIcon).addTo(markerGroup);
      }

      markerGroup.addTo(map);
    }
    return () => {
      markerGroup.clearLayers();
    };
  }, [map, markerGroup, offers, selectedOffer, currentCityOffers]);

  return <div style={{height: '100%'}} ref={mapRef} />;
}
