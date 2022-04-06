import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';
import {useAppDispatch} from '../../hooks';
import {Cities} from '../../const';
import {changeCity} from '../../store/view-process/view-process';

export default function LoginLocation(): JSX.Element {
  const dispatch = useAppDispatch();

  const getRandomCity = () => Cities.map((city) => city.name).sort(() => Math.random() - 0.5)[0];
  const randomCity = getRandomCity();

  const handleClick = () => dispatch(changeCity(randomCity));

  return(
    <section className='locations locations--login locations--current'>
      <div className='locations__item'>
        <Link to={AppRoute.Main} onClick={handleClick} className='locations__item-link'>
          <span>{randomCity}</span>
        </Link>
      </div>
    </section>
  );
}
