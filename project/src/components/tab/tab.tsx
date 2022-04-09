import {Link} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {changeCity} from '../../store/view-process/view-process';
import {getCityName} from '../../store/view-process/selectors';

export default function Tab(props: {cityName: string}): JSX.Element {
  const dispatch = useAppDispatch();
  const cityName = useAppSelector(getCityName);

  const onTabClick = () => dispatch(changeCity(props.cityName));

  return (
    <li className='locations__item'>
      <Link
        to=''
        className={`locations__item-link tabs__item ${props.cityName === cityName ? 'tabs__item--active' : ''}`}
        onClick={onTabClick}
      >
        <span>{props.cityName}</span>
      </Link>
    </li>
  );
}
