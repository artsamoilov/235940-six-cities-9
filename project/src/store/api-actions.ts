import {createAsyncThunk} from '@reduxjs/toolkit';
import {api, store} from './index';
import {APIRoute, AppRoute, AuthorizationStatus} from '../const';
import {OfferType} from '../types/offer-type';
import {UserData} from '../types/user-data';
import {AuthData} from '../types/auth-data';
import {dropToken, saveToken} from '../services/token';
import {errorHandle} from '../services/error-handle';
import {useParams} from 'react-router-dom';
import {CommentType} from '../types/comment-type';
import {
  loadCurrentOffer,
  loadNearbyOffers,
  loadOffers,
  loadUserData,
  redirectToRoute,
  requireAuthorization,
  loadComments
} from './action';

const Action = {
  FETCH_OFFERS: 'FETCH_OFFERS',
  CHECK_AUTH: 'CHECK_AUTH',
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  CLEAR_ERROR: 'CLEAR_ERROR',
  FETCH_CURRENT_OFFER: 'FETCH_CURRENT_OFFER',
  FETCH_NEARBY_OFFERS: 'FETCH_NEARBY_OFFERS',
  FETCH_COMMENTS: 'FETCH_COMMENTS',
};

export const fetchOffersAction = createAsyncThunk(
  Action.FETCH_OFFERS,
  async () => {
    try {
      const {data} = await api.get<OfferType[]>(APIRoute.Offers);
      store.dispatch(loadOffers(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const checkAuthAction = createAsyncThunk(
  Action.CHECK_AUTH,
  async () => {
    try {
      const {data} = await api.get(APIRoute.Login);
      store.dispatch(loadUserData(data));
      store.dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch (error) {
      errorHandle(error);
      store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk(
  Action.LOGIN,
  async ({email, password}: AuthData) => {
    try {
      const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
      saveToken(data.token);
      store.dispatch(loadUserData(data));
      store.dispatch(requireAuthorization(AuthorizationStatus.Auth));
      store.dispatch(redirectToRoute(AppRoute.Main));
    } catch (error) {
      errorHandle(error);
      store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const logoutAction = createAsyncThunk(
  Action.LOGOUT,
  async () => {
    try {
      await api.delete(APIRoute.Logout);
      dropToken();
      store.dispatch(loadUserData({} as UserData));
      store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchCurrentOfferAction = createAsyncThunk(
  Action.FETCH_CURRENT_OFFER,
  async () => {
    try {
      const {data} = await api.get<OfferType>(`${APIRoute.Offers}/${useParams().id}`);
      store.dispatch(loadCurrentOffer(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchNearbyOffersAction = createAsyncThunk(
  Action.FETCH_NEARBY_OFFERS,
  async () => {
    try {
      const {data} = await api.get<OfferType[]>(`${APIRoute.Offers}/${useParams().id}/nearby`);
      store.dispatch(loadNearbyOffers(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchCommentsAction = createAsyncThunk(
  Action.FETCH_COMMENTS,
  async () => {
    try {
      const {data} = await api.get<CommentType[]>(`${APIRoute.Comments}/${useParams().id}`);
      store.dispatch(loadComments(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);
