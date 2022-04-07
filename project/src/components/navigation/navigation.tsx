import {Link} from 'react-router-dom';
import {useAppSelector, useAppDispatch} from '../../hooks';
import {AppRoute, AuthorizationStatus} from '../../const';
import {logoutAction} from '../../store/api-actions';
import {memo} from 'react';

function Navigation(): JSX.Element {
  const authorizationStatus = useAppSelector(({USER}) => USER.authorizationStatus);
  const userData = useAppSelector(({DATA}) => DATA.userData);
  const dispatch = useAppDispatch();

  const handleSignOutClick = () => dispatch(logoutAction());

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
            <Link onClick={handleSignOutClick} to='' className="header__nav-link">
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

export default memo(Navigation);
