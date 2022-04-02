import {useAppSelector} from '../../hooks';
import {store} from '../../store';
import {fetchFavoritesAction} from '../../store/api-actions';
import Navigation from '../../components/navigation/navigation';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import Spinner from '../../components/spinner/spinner';
import FavoritesEmpty from '../../components/favorites-empty/favorites-empty';
import Favorites from '../../components/favorites/favorites';

export default function FavoritesPage(): JSX.Element {
  const {isFavoritesLoaded, isFavoritesUpdated, favorites} = useAppSelector(({DATA}) => DATA);

  if (!isFavoritesUpdated) {
    store.dispatch(fetchFavoritesAction());
  }

  if (!isFavoritesLoaded) {
    return <Spinner />;
  }

  const isFavoritesEmpty = (): string => favorites.length === 0 ? 'page--favorites-empty' : '';

  return (
    <div className={`page ${isFavoritesEmpty()}`}>
      <Header>
        <Navigation />
      </Header>
      {isFavoritesEmpty() ? <FavoritesEmpty /> : <Favorites />}
      <Footer />
    </div>
  );
}
