import {Navigate, useParams} from 'react-router-dom';
import {useState} from 'react';
import {OfferType} from '../../types/offer-type';
import {AppRoute} from '../../const';
import {useAppSelector} from '../../hooks';
import {fetchCommentsAction, fetchCurrentOfferAction, fetchNearbyOffersAction} from '../../store/api-actions';
import {store} from '../../store';
import Navigation from '../../components/navigation/navigation';
import Header from '../../components/header/header';
import CardsList from '../../components/cards-list/cards-list';
import PropertyGallery from '../../components/property-gallery/property-gallery';
import Map from '../../components/map/map';
import Spinner from '../../components/spinner/spinner';
import Property from '../../components/property/property';

export default function PropertyPage(): JSX.Element {
  const [selectedOffer, setSelectedOffer] = useState<OfferType | undefined>(undefined);
  const {offers, currentOffer, nearbyOffers} = useAppSelector(({DATA}) => DATA);
  const currentOfferId = useParams().id;

  if (!offers.find((offer) => offer.id === Number(currentOfferId))) {
    return <Navigate to={AppRoute.NotFound}/>;
  }

  const loadOfferData = (offerId: string | undefined) => {
    store.dispatch(fetchCurrentOfferAction(offerId));
    store.dispatch(fetchNearbyOffersAction(offerId));
    store.dispatch(fetchCommentsAction(offerId));
  };

  if (currentOffer.id !== Number(currentOfferId)) {
    loadOfferData(currentOfferId);
    return <Spinner />;
  }

  const cardHoverHandler = (id: number) => {
    const hoveredOffer = nearbyOffers.find((offer) => offer.id === id);
    setSelectedOffer(hoveredOffer);
  };

  return (
    <div className='page'>
      <Header>
        <Navigation />
      </Header>

      <main className='page__main page__main--property'>
        <section className='property'>
          <PropertyGallery images={currentOffer.images} />
          <Property />
          <section className='property__map map'>
            <Map selectedOffer={selectedOffer} offers={nearbyOffers} />
          </section>
        </section>
        <div className='container'>
          <section className='near-places places'>
            <h2 className='near-places__title'>Other places in the neighbourhood</h2>
            <div className='near-places__list places__list'>
              <CardsList handleCardHover={cardHoverHandler} offers={nearbyOffers} />
            </div>
          </section>
        </div>
      </main>

    </div>
  );
}
