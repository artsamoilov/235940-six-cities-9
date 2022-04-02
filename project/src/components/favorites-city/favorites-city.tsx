import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';
import {changeCity} from '../../store/view-process/view-process';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {OfferType} from '../../types/offer-type';
import FavoritesCard from '../favorites-card/favorites-card';

type PropsType = {
  cityName: string,
};

export default function FavoritesCity({cityName}: PropsType): JSX.Element {
  const favorites = useAppSelector(({DATA}) => DATA.favorites);
  const dispatch = useAppDispatch();

  const filteredOffers = favorites.filter((offer) => offer.city.name === cityName);

  return (
    <li className='favorites__locations-items'>
      <div className='favorites__locations locations locations--current'>
        <div className='locations__item'>
          <Link
            to={AppRoute.Main}
            className='locations__item-link'
            onClick={() => dispatch(changeCity(cityName))}
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
