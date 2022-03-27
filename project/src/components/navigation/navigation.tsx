import {Link} from 'react-router-dom';
import {useAppSelector, useAppDispatch} from '../../hooks';
import {AppRoute, AuthorizationStatus} from '../../const';
import {logoutAction} from '../../store/api-actions';

export default function Navigation(): JSX.Element {
  const {authorizationStatus, userData} = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  if (authorizationStatus === AuthorizationStatus.Auth) {
    return (
      <nav className="header__nav">
        <ul className="header__nav-list">
          <li className="header__nav-item user">
            <Link to={AppRoute.Favorites} className="header__nav-link header__nav-link--profile">
              <div className="header__avatar-wrapper user__avatar-wrapper"
                style={{backgroundImage: `url(${userData.avatarUrl})`, borderRadius: '50%'}}
              />
              <span className="header__user-name user__name">{userData.email}</span>
            </Link>
          </li>
          <li className="header__nav-item">
            <Link onClick={() => dispatch(logoutAction())} to='' className="header__nav-link">
              <span className="header__signout">Sign out</span>
            </Link>
          </li>
        </ul>
      </nav>
    );
  }

  return (
    <nav className='header__nav'>
      <ul className='header__nav-list'>
        <li className='header__nav-item user'>
          <Link to={AppRoute.SignIn} className='header__nav-link header__nav-link--profile'>
            <div className='header__avatar-wrapper user__avatar-wrapper' />
            <span className="header__login">Sign in</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
