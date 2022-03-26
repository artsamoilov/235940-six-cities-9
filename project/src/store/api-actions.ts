import {createAsyncThunk} from '@reduxjs/toolkit';
import {api, store} from './index';
import {APIRoute, AppRoute, AuthorizationStatus} from '../const';
import {OfferType} from '../types/offer-type';
import {loadOffers, redirectToRoute, requireAuthorization} from './action';
import {UserData} from '../types/user-data';
import {AuthData} from '../types/auth-data';
import {dropToken, saveToken} from '../services/token';

const Action = {
  FETCH_OFFERS: 'FETCH_OFFERS',
  CHECK_AUTH: 'CHECK_AUTH',
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
}

export const fetchOffersAction = createAsyncThunk(
  Action.FETCH_OFFERS,
  async () => {
    const {data} = await api.get<OfferType[]>(APIRoute.Offers);
    store.dispatch(loadOffers(data));
  },
);

export const checkAuthAction = createAsyncThunk(
  Action.CHECK_AUTH,
  async () => {
    await api.get(APIRoute.Login);
    store.dispatch(requireAuthorization(AuthorizationStatus.Auth));
  },
);

export const loginAction = createAsyncThunk(
  Action.LOGIN,
  async ({email, password}: AuthData) => {
    const {data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(token);
    store.dispatch(requireAuthorization(AuthorizationStatus.Auth));
    store.dispatch(redirectToRoute(AppRoute.Main));
  },
);

export const logoutAction = createAsyncThunk(
  Action.LOGOUT,
  async () => {
    await api.delete(APIRoute.Logout);
    dropToken();
    store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  },
);
