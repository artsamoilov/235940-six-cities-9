import {Link} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {changeCity} from '../../store/view-process/view-process';

export default function Tab(props: {cityName: string}): JSX.Element {
  const dispatch = useAppDispatch();
  const cityName = useAppSelector(({VIEW}) => VIEW.cityName);

  return (
    <li className='locations__item'>
      <Link to='' className={`locations__item-link tabs__item ${props.cityName === cityName ? 'tabs__item--active' : ''}`} onClick={() => {
        dispatch(changeCity(props.cityName));
      }}
      >
        <span>{props.cityName}</span>
      </Link>
    </li>
  );
}
