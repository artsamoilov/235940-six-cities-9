import {Link} from 'react-router-dom';
import Logo from '../../components/logo/logo';
import Navigation from '../../components/navigation/navigation';
import FavoritesCard from '../../components/favorites-card/favorites-card';

export default function FavoritesPage(): JSX.Element {
  return (
    <div className='page'>
      <header className='header'>
        <div className='container'>
          <div className='header__wrapper'>
            <Logo />
            <Navigation />
          </div>
        </div>
      </header>

      <main className='page__main page__main--favorites'>
        <div className='page__favorites-container container'>
          <section className='favorites'>
            <h1 className='favorites__title'>Saved listing</h1>
            <ul className='favorites__list'>
              <li className='favorites__locations-items'>
                <div className='favorites__locations locations locations--current'>
                  <div className='locations__item'>
                    <Link to='#' className='locations__item-link'>
                      <span>Amsterdam</span>
                    </Link>
                  </div>
                </div>
                <div className='favorites__places'>
                  <FavoritesCard />
                  <FavoritesCard />
                </div>
              </li>

              <li className='favorites__locations-items'>
                <div className='favorites__locations locations locations--current'>
                  <div className='locations__item'>
                    <Link to='#' className='locations__item-link'>
                      <span>Cologne</span>
                    </Link>
                  </div>
                </div>
                <div className='favorites__places'>
                  <FavoritesCard />
                </div>
              </li>
            </ul>
          </section>
        </div>
      </main>
      <footer className='footer container'>
        <Link to='/' className='footer__logo-link'>
          <img className='footer__logo' src='img/logo.svg' alt='6 cities logo' width='64' height='33' />
        </Link>
      </footer>
    </div>
  );
}
