import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';
import {changeCity} from '../../store/view-process/view-process';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {OfferType} from '../../types/offer-type';
import {getFavorites} from '../../store/offers-data/selectors';
import FavoritesCard from '../favorites-card/favorites-card';

type PropsType = {
  cityName: string,
};

export default function FavoritesCity({cityName}: PropsType): JSX.Element {
  const favorites = useAppSelector(getFavorites);
  const dispatch = useAppDispatch();

  const filteredOffers = favorites.filter((offer) => offer.city.name === cityName);

  const handleLocationClick = () => dispatch(changeCity(cityName));

  return (
    <li className='favorites__locations-items'>
      <div className='favorites__locations locations locations--current'>
        <div className='locations__item'>
          <Link
            to={AppRoute.Main}
            className='locations__item-link'
            onClick={handleLocationClick}
          >
            <span>{cityName}</span>
          </Link>
        </div>
      </div>
      <div className='favorites__places'>
        {filteredOffers.map((currentOffer: OfferType): JSX.Element => <FavoritesCard key={currentOffer.id} offer={currentOffer}/>)}
      </div>
    </li>
  );
}
