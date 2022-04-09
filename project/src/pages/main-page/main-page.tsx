import {useAppSelector} from '../../hooks';
import {getCityName} from '../../store/view-process/selectors';
import {getOffers} from '../../store/offers-data/selectors';
import Tabs from '../../components/tabs/tabs';
import Header from '../../components/header/header';
import Navigation from '../../components/navigation/navigation';
import Cities from '../../components/cities/cities';
import CitiesEmpty from '../../components/cities-empty/cities-empty';

export default function MainPage(): JSX.Element {
  const cityName = useAppSelector(getCityName);
  const offers = useAppSelector(getOffers);

  const currentCityOffers = offers.filter(({city}) => city.name === cityName);

  const isOffersExist = currentCityOffers.length > 0;

  return (
    <div className='page page--gray page--main'>
      <Header>
        <Navigation />
      </Header>
      <main className={`page__main page__main--index ${!isOffersExist && 'page__main--index-empty'}`}>
        <h1 className='visually-hidden'>Cities</h1>
        <Tabs />
        <div className="cities">
          {isOffersExist ? <Cities /> : <CitiesEmpty />}
        </div>
      </main>
    </div>
  );
}
