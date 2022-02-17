import {Link} from 'react-router-dom';

export default function Navigation() {
  return (
    <nav className='header__nav'>
      <ul className='header__nav-list'>
        <li className='header__nav-item user'>
          <Link to='/favorites' className='header__nav-link header__nav-link--profile'>
            <div className='header__avatar-wrapper user__avatar-wrapper' />
            <span className='header__user-name user__name'>Oliver.conner@gmail.com</span>
          </Link>
        </li>
        <li className='header__nav-item'>
          <Link to='/login' className='header__nav-link'>
            <span className='header__signout'>Sign out</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
