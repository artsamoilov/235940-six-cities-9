import {getRatingPercent} from '../../common';
import {Link} from 'react-router-dom';
import {OfferType} from '../../types/offer-type';
import {store} from '../../store';
import {fetchCurrentOfferAction, removeFromFavoritesAction} from '../../store/api-actions';
import {useDispatch} from 'react-redux';
import CardPremiumMark from '../card-premium-mark/card-premium-mark';

type PropsType = {
  offer: OfferType,
};

export default function FavoritesCard({offer}: PropsType): JSX.Element {
  const handleFavoritesClick = () => store.dispatch(removeFromFavoritesAction(String(offer.id)));

  const dispatch = useDispatch();

  const handleLinkClick = () => dispatch(fetchCurrentOfferAction(String(offer.id)));

  return (
    <article className='favorites__card place-card'>
      {offer.isPremium && <CardPremiumMark />}
      <div className='favorites__image-wrapper place-card__image-wrapper'>
        <Link onClick={handleLinkClick} to={`../offer/${offer.id}`}>
          <img className='place-card__image' src={offer.previewImage} width='150' height='110' alt={offer.title} />
        </Link>
      </div>
      <div className='favorites__card-info place-card__info'>
        <div className='place-card__price-wrapper'>
          <div className='place-card__price'>
            <b className='place-card__price-value'>&euro;{offer.price}</b>
            <span className='place-card__price-text'>&#47;&nbsp;night</span>
          </div>
          <button
            className='place-card__bookmark-button place-card__bookmark-button--active button'
            type='button'
            onClick={handleFavoritesClick}
          >
            <svg className='place-card__bookmark-icon' width='18' height='19'>
              <use xlinkHref='#icon-bookmark' />
            </svg>
            <span className='visually-hidden'>In bookmarks</span>
          </button>
        </div>
        <div className='place-card__rating rating'>
          <div className='place-card__stars rating__stars'>
            <span style={{width: `${getRatingPercent(offer.rating)}%`}} />
            <span className='visually-hidden'>Rating</span>
          </div>
        </div>
        <h2 className='place-card__name'>
          <Link onClick={handleLinkClick} to={`../offer/${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className='place-card__type'>{`${offer.type[0].toUpperCase() + offer.type.slice(1)}`}</p>
      </div>
    </article>
  );
}
