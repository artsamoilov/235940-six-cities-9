import {useAppSelector} from '../../hooks';
import FavoritesCity from '../favorites-city/favorites-city';

export default function Favorites(): JSX.Element {
  const favorites = useAppSelector(({DATA}) => DATA.favorites);

  const uniqueCities = [...new Set(favorites.map((offer) => offer.city.name))];

  return (
    <main className='page__main page__main--favorites'>
      <div className='page__favorites-container container'>
        <section className='favorites'>
          <h1 className='favorites__title'>Saved listing</h1>
          <ul className='favorites__list'>
            {uniqueCities.map((cityName: string): JSX.Element => <FavoritesCity key={cityName} cityName={cityName} />)}
          </ul>
        </section>
      </div>
    </main>
  );
}
