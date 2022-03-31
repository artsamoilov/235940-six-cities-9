import {createAsyncThunk} from '@reduxjs/toolkit';
import {api, store} from './index';
import {APIRoute, AppRoute, AuthorizationStatus} from '../const';
import {OfferType} from '../types/offer-type';
import {UserData} from '../types/user-data';
import {AuthData} from '../types/auth-data';
import {dropToken, saveToken} from '../services/token';
import {errorHandle} from '../services/error-handle';
import {CommentType} from '../types/comment-type';
import {redirectToRoute} from './action';
import {requireAuthorization} from './user-process/user-process';
import {loadOffers, loadUserData, loadCurrentOffer, loadNearbyOffers, loadComments} from './offers-data/offers-data';

const Action = {
  FETCH_OFFERS: 'FETCH_OFFERS',
  CHECK_AUTH: 'CHECK_AUTH',
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  CLEAR_ERROR: 'CLEAR_ERROR',
  FETCH_CURRENT_OFFER: 'FETCH_CURRENT_OFFER',
  FETCH_NEARBY_OFFERS: 'FETCH_NEARBY_OFFERS',
  FETCH_COMMENTS: 'FETCH_COMMENTS',
  POST_COMMENT: 'POST_COMMENT',
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
  async (offerId: string | undefined) => {
    try {
      const {data} = await api.get<OfferType>(`${APIRoute.Offers}/${offerId}`);
      store.dispatch(loadCurrentOffer(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchNearbyOffersAction = createAsyncThunk(
  Action.FETCH_NEARBY_OFFERS,
  async (offerId: string | undefined) => {
    try {
      const {data} = await api.get<OfferType[]>(`${APIRoute.Offers}/${offerId}/nearby`);
      store.dispatch(loadNearbyOffers(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchCommentsAction = createAsyncThunk(
  Action.FETCH_COMMENTS,
  async (offerId: string | undefined) => {
    try {
      const {data} = await api.get<CommentType[]>(`${APIRoute.Comments}/${offerId}`);
      store.dispatch(loadComments(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const postCommentAction = createAsyncThunk(
  Action.POST_COMMENT,
  async ({offerId, rating, comment}: {offerId: string | undefined, rating: number, comment: string}) => {
    try {
      const {data} = await api.post(`${APIRoute.Comments}/${offerId}`, {rating: rating, comment: comment});
      store.dispatch(loadComments(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);
