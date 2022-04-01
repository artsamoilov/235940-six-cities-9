import {getRatingPercent} from '../../utils';
import {AuthorizationStatus} from '../../const';
import {useAppSelector} from '../../hooks';
import {memo} from 'react';
import PropertyPremiumMark from '../property-premium-mark/property-premium-mark';
import ReviewsList from '../reviews-list/reviews-list';
import CommentForm from '../comment-form/comment-form';

function Property(): JSX.Element {
  const currentOffer = useAppSelector(({DATA}) => DATA.currentOffer);
  const authorizationStatus = useAppSelector(({USER}) => USER.authorizationStatus);

  return (
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
            {currentOffer.goods.map((good: string) => <li key={good} className='property__inside-item'>{good}</li>)}
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
          <ReviewsList />
          {authorizationStatus === AuthorizationStatus.Auth ? <CommentForm /> : ''}
        </section>
      </div>
    </div>
  );
}

export default memo(Property);
