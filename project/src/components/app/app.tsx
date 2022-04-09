import {Route, Routes} from 'react-router-dom';
import {AppRoute} from '../../const';
import {useAppSelector} from '../../hooks';
import {isAuthStatusUnknown} from '../../common';
import {getAuthorizationStatus} from '../../store/user-process/selectors';
import {getDataLoadingStatus} from '../../store/offers-data/selectors';
import MainPage from '../../pages/main-page/main-page';
import PropertyPage from '../../pages/property-page/property-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import LoginPage from '../../pages/login-page/login-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import PrivateRoute from '../private-route/private-route';
import Spinner from '../spinner/spinner';

export default function App(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isDataLoaded = useAppSelector(getDataLoadingStatus);

  if (isAuthStatusUnknown(authorizationStatus) || !isDataLoaded) {
    return <Spinner />;
  }

  return (
    <Routes>
      <Route
        path={AppRoute.Main}
        element={<MainPage />}
      />
      <Route
        path={AppRoute.SignIn}
        element={<LoginPage />}
      />
      <Route
        path={AppRoute.Favorites}
        element={
          <PrivateRoute authorizationStatus={authorizationStatus}>
            <FavoritesPage />
          </PrivateRoute>
        }
      />
      <Route
        path={AppRoute.Room}
        element={<PropertyPage/>}
      />
      <Route
        path='*'
        element={<NotFoundPage />}
      />
    </Routes>
  );
}
