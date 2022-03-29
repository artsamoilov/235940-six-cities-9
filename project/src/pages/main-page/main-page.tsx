import {useCallback, useState} from 'react';
import {OfferType} from '../../types/offer-type';
import {useAppSelector} from '../../hooks';
import Tabs from '../../components/tabs/tabs';
import Header from '../../components/header/header';
import Navigation from '../../components/navigation/navigation';
import CardsList from '../../components/cards-list/cards-list';
import Map from '../../components/map/map';
import Sorting from '../../components/sorting/sorting';

export default function MainPage(): JSX.Element {
  const [selectedOffer, setSelectedOffer] = useState<OfferType | undefined>(undefined);
  const {cityName, offers} = useAppSelector((state) => state);
  const currentCityOffers = offers.filter(({city}) => city.name === cityName);

  const handleCardHover = useCallback((id: number) => {
    const currentOffer = offers.find((offer) => offer.id === id);
    setSelectedOffer(currentOffer);
  }, []);

  return (
    <div className='page page--gray page--main'>
      <Header>
        <Navigation />
      </Header>

      <main className='page__main page__main--index'>
        <h1 className='visually-hidden'>Cities</h1>
        <Tabs />
        <div className='cities'>
          <div className='cities__places-container container'>
            <section className='cities__places places'>
              <h2 className='visually-hidden'>Places</h2>
              <b className='places__found'>{currentCityOffers.length} places to stay in {cityName}</b>
              <Sorting />
              <div className='cities__places-list places__list tabs__content'>
                <CardsList handleCardHover={handleCardHover} offers={offers}/>
              </div>
            </section>
            <div className='cities__right-section'>
              <section className='cities__map map'>
                <Map selectedOffer={selectedOffer} offers={offers}/>
              </section>
            </div>
          </div>
        </div>
      </main>

    </div>
  );
}
