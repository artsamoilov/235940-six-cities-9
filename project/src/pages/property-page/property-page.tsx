import {Navigate, useParams} from 'react-router-dom';
import {OfferType} from '../../types/offer-type';
import {ReviewType} from '../../types/review-type';
import {AppRoute} from '../../const';
import {getRatingPercent} from '../../utils';
import {Reviews} from '../../mocks/reviews';
import Navigation from '../../components/navigation/navigation';
import Header from '../../components/header/header';
import CardsList from '../../components/cards-list/cards-list';
import PropertyPremiumMark from '../../components/property-premium-mark/property-premium-mark';
import PropertyGallery from '../../components/property-gallery/property-gallery';
import PropertyReview from '../../components/property-review/property-review';
import CommentForm from '../../components/comment-form/comment-form';

type PropsType = {
  offers: OfferType[],
}

export default function PropertyPage({offers}: PropsType): JSX.Element {
  const currentOfferId = useParams().id;
  const currentOffer = offers.find((offer: OfferType) => offer.id.toString() === currentOfferId);

  if (!currentOffer) {
    return <Navigate to={AppRoute.SignIn}/>;
  }

  return (
    <div className='page'>
      <Header>
        <Navigation />
      </Header>

      <main className='page__main page__main--property'>
        <section className='property'>
          <PropertyGallery images={currentOffer.images} />
          <div className='property__container container'>
            <div className='property__wrapper'>
              {currentOffer.isPremium && <PropertyPremiumMark />}
              <div className='property__name-wrapper'>
                <h1 className='property__name'>{currentOffer.title}</h1>
                <button className={`property__bookmark-button ${currentOffer.isFavorite && 'property__bookmark-button--active'} button`} type='button'>
                  <svg className='property__bookmark-icon' width='31' height='33'>
                    <use xlinkHref='#icon-bookmark' />
                  </svg>
                  <span className='visually-hidden'>To bookmarks</span>
                </button>
              </div>
              <div className='property__rating rating'>
                <div className='property__stars rating__stars'>
                  <span style={{width: `${getRatingPercent(currentOffer.rating)}%`}} />
                  <span className='visually-hidden'>Rating</span>
                </div>
                <span className='property__rating-value rating__value'>{currentOffer.rating}</span>
              </div>
              <ul className='property__features'>
                <li className='property__feature property__feature--entire'>{`${currentOffer.type[0].toUpperCase() + currentOffer.type.slice(1)}`}</li>
                <li className='property__feature property__feature--bedrooms'>{currentOffer.bedrooms} Bedrooms</li>
                <li className='property__feature property__feature--adults'>Max {currentOffer.maxAdults} adults</li>
              </ul>
              <div className='property__price'>
                <b className='property__price-value'>&euro;{currentOffer.price}</b>
                <span className='property__price-text'>&nbsp;night</span>
              </div>
              <div className='property__inside'>
                <h2 className='property__inside-title'>What&apos;s inside</h2>
                <ul className='property__inside-list'>
                  {currentOffer.goods.map((good: string, index: number) => <li key={`goods${index}`} className='property__inside-item'>{good}</li>)}
                </ul>
              </div>
              <div className='property__host'>
                <h2 className='property__host-title'>Meet the host</h2>
                <div className='property__host-user user'>
                  <div className={`property__avatar-wrapper ${currentOffer.host.isPro && 'property__avatar-wrapper--pro'} user__avatar-wrapper`}>
                    <img className='property__avatar user__avatar' src={currentOffer.host.avatarUrl} width='74' height='74' alt='Host avatar' />
                  </div>
                  <span className='property__user-name'>{currentOffer.host.name}</span>
                  {currentOffer.host.isPro && <span className='property__user-status'>Pro</span>}
                </div>
                <div className='property__description'>
                  <p className='property__text'>{currentOffer.description}</p>
                </div>
              </div>
              <section className='property__reviews reviews'>
                <h2 className='reviews__title'>Reviews &middot; <span className='reviews__amount'>{Reviews.length}</span></h2>
                <ul className='reviews__list'>
                  {Reviews.map((review: ReviewType, index: number) => <PropertyReview key={`review${index}`} {...Reviews[index]}/>)}
                </ul>
                <CommentForm />
              </section>
            </div>
          </div>
          <section className='property__map map' />
        </section>
        <div className='container'>
          <section className='near-places places'>
            <h2 className='near-places__title'>Other places in the neighbourhood</h2>
            <div className='near-places__list places__list'>
              <CardsList offers={offers.filter((offer) => offer.id.toString() !== currentOfferId)}/>
            </div>
          </section>
        </div>
      </main>

    </div>
  );
}
