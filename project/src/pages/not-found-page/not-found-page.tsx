import {Link} from 'react-router-dom';
import Header from '../../components/header/header';

export default function NotFoundPage(): JSX.Element {
  return (
    <div className="page page--gray page--main">
      <Header />

      <main className="page__main page__main--index page__main--index-empty">
        <h1 className="visually-hidden">Error 404</h1>
        <div className="cities">
          <div className="cities__places-container cities__places-container--empty container">
            <section className="cities__no-places">
              <div className="cities__status-wrapper tabs__content">
                <b className="cities__status">404 Not Found</b>
                <p className="cities__status-description"><Link to='/'>Return to main page</Link></p>
              </div>
            </section>
            <div className="cities__right-section" />
          </div>
        </div>
      </main>

    </div>
  );
}
