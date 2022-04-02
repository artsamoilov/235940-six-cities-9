import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {OfferType} from '../../types/offer-type';
import {getRatingPercent} from '../../utils';
import {setFavoriteAction} from '../../store/api-actions';
import {store} from '../../store';
import {useAppSelector} from '../../hooks';
import {AppRoute, AuthorizationStatus} from '../../const';
import CardPremiumMark from '../card-premium-mark/card-premium-mark';

type PropsType = {
  offer: OfferType,
  cardHoverHandler: (id: number) => void,
}

export default function Card({offer, cardHoverHandler}: PropsType): JSX.Element {
  const [favoriteStatus, setFavoriteStatus] = useState(offer.isFavorite);
  const authorizationStatus = useAppSelector(({USER}) => USER.authorizationStatus);

  const navigate = useNavigate();

  const handleFavoriteClick = () => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      setFavoriteStatus(!favoriteStatus);
      store.dispatch(setFavoriteAction({offerId: offer.id, status: Number(!favoriteStatus)}));
    } else {
      navigate(AppRoute.SignIn);
    }
  };

  return (
    <article className='cities__place-card place-card' onMouseOver={() => cardHoverHandler(offer.id)} onMouseLeave={() => cardHoverHandler(-1)}>
      {offer.isPremium && <CardPremiumMark />}
      <div className='cities__image-wrapper place-card__image-wrapper'>
        <Link to={`/offer/${offer.id}`}>
          <img className='place-card__image' src={offer.previewImage} width='260' height='200' alt={`${offer.title}`} />
        </Link>
      </div>
      <div className='place-card__info'>
        <div className='place-card__price-wrapper'>
          <div className='place-card__price'>
            <b className='place-card__price-value'>&euro;{offer.price}&nbsp;</b>
            <span className='place-card__price-text'>&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button ${favoriteStatus && 'place-card__bookmark-button--active'} button`}
            type='button'
            onClick={handleFavoriteClick}
          >
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
        <p className='place-card__type'>{`${offer.type[0].toUpperCase() + offer.type.slice(1)}`}</p>
      </div>
    </article>
  );
}
