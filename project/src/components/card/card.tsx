import {Link} from 'react-router-dom';
import {OfferType} from '../../const';

type PropsType = {
  offer: OfferType,
}

const MAX_RATING: number = 5;
const MAX_PERCENT: number = 100;

const getRatingPercent = (rating: number): number => rating / MAX_RATING * MAX_PERCENT;

export default function Card({offer}: PropsType): JSX.Element {
  return (
    <article className='cities__place-card place-card'>
      {offer.isPremium || <div className='place-card__mark'><span>Premium</span></div>}
      <div className='cities__image-wrapper place-card__image-wrapper'>
        <Link to={`/offer/${offer.id}`}>
          <img className='place-card__image' src={offer.previewImage} width='260' height='200' alt={`${offer.title} image`} />
        </Link>
      </div>
      <div className='place-card__info'>
        <div className='place-card__price-wrapper'>
          <div className='place-card__price'>
            <b className='place-card__price-value'>&euro;{offer.price}&nbsp;</b>
            <span className='place-card__price-text'>&#47;&nbsp;night</span>
          </div>
          <button className={`place-card__bookmark-button ${offer.isFavorite || 'place-card__bookmark-button--active'} button`} type='button'>
            <svg className='place-card__bookmark-icon' width='18' height='19'>
              <use xlinkHref='#icon-bookmark' />
            </svg>
            <span className='visually-hidden'>To bookmarks</span>
          </button>
        </div>
        <div className='place-card__rating rating'>
          <div className='place-card__stars rating__stars'>
            <span style={{width: `${getRatingPercent(offer.rating)}%`}} />
            <span className='visually-hidden'>Rating</span>
          </div>
        </div>
        <h2 className='place-card__name'>
          <Link to={`/offer/${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className='place-card__type' style={{textTransform: 'capitalize'}}>{`${offer.type}`}</p>
      </div>
    </article>
  );
}
