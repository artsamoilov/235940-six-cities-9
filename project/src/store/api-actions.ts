import {createAsyncThunk} from '@reduxjs/toolkit';
import {api, store} from './index';
import {APIRoute, AuthorizationStatus} from '../const';
import {OfferType} from '../types/offer-type';
import {loadOffers, requireAuthorization} from './action';
import {UserData} from '../types/user-data';
import {AuthData} from '../types/auth-data';
import {dropToken, saveToken} from '../services/token';

export const fetchOffersAction = createAsyncThunk(
  'LOAD_OFFERS',
  async () => {
    const {data} = await api.get<OfferType[]>(APIRoute.Offers);
    store.dispatch(loadOffers(data));
  },
);

export const checkAuthAction = createAsyncThunk(
  'CHECK_AUTH',
  async () => {
    await api.get(APIRoute.Login);
    store.dispatch(requireAuthorization(AuthorizationStatus.Auth));
  },
);

export const loginAction = createAsyncThunk(
  'LOGIN',
  async ({email, password}: AuthData) => {
    const {data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(token);
    store.dispatch(requireAuthorization(AuthorizationStatus.Auth));
  },
);

export const logoutAction = createAsyncThunk(
  'LOGOUT',
  async () => {
    await api.delete(APIRoute.Logout);
    dropToken();
    store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  },
);
