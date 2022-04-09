import {useCallback, useState} from 'react';
import {OfferType} from '../../types/offer-type';
import {useAppSelector} from '../../hooks';
import {getCityName} from '../../store/view-process/selectors';
import {getOffers} from '../../store/offers-data/selectors';
import Sorting from '../sorting/sorting';
import CardsList from '../cards-list/cards-list';
import MainMap from '../main-map/main-map';

export default function Cities(): JSX.Element {
  const [selectedOffer, setSelectedOffer] = useState<OfferType | undefined>(undefined);

  const cityName = useAppSelector(getCityName);
  const offers = useAppSelector(getOffers);

  const currentCityOffers = offers.filter(({city}) => city.name === cityName);

  const onCardHover = useCallback((id: number) => {
    const currentOffer = offers.find((offer) => offer.id === id);
    setSelectedOffer(currentOffer);
  }, [offers]);

  return (
    <div className='cities__places-container container'>
      <section className='cities__places places'>
        <h2 className='visually-hidden'>Places</h2>
        <b className='places__found'>{currentCityOffers.length} places to stay in {cityName}</b>
        <Sorting />
        <div className='cities__places-list places__list tabs__content'>
          <CardsList onCardHover={onCardHover} offers={offers} />
        </div>
      </section>
      <div className='cities__right-section'>
        <section className='cities__map map'>
          <MainMap selectedOffer={selectedOffer} offers={offers} />
        </section>
      </div>
    </div>
  );
}
