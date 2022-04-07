import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {AppDispatch, State} from '../types/state';
import {APIRoute, AppRoute, AuthorizationStatus} from '../const';
import {OfferType} from '../types/offer-type';
import {UserData} from '../types/user-data';
import {AuthData} from '../types/auth-data';
import {dropToken, saveToken} from '../services/token';
import {errorHandle} from '../services/error-handle';
import {CommentType} from '../types/comment-type';
import {redirectToRoute} from './action';
import {requireAuthorization} from './user-process/user-process';
import {
  loadOffers,
  loadUserData,
  loadCurrentOffer,
  loadNearbyOffers,
  loadComments,
  loadFavorites,
  changeFavorite,
  setFavoritesLoadingNeeded,
  setCommentSending, setCommentSent
} from './offers-data/offers-data';

const Action = {
  FETCH_OFFERS: 'data/fetchOffers',
  CHECK_AUTH: 'user/checkAuth',
  LOGIN: 'user/login',
  LOGOUT: 'user/logout',
  FETCH_CURRENT_OFFER: 'data/fetchCurrentOffer',
  FETCH_NEARBY_OFFERS: 'data/fetchNearbyOffers',
  FETCH_COMMENTS: 'data/fetchComments',
  POST_COMMENT: 'data/postComment',
  FETCH_FAVORITES: 'data/fetchFavorites',
  CHANGE_FAVORITE: 'data/changeFavorite',
  REMOVE_FAVORITE: 'data/removeFavorite',
};

export const fetchOffersAction = createAsyncThunk<void, undefined,
  {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
  }>(
    Action.FETCH_OFFERS,
    async (_arg, {dispatch, extra: api}) => {
      try {
        const {data} = await api.get<OfferType[]>(APIRoute.Offers);
        dispatch(loadOffers(data));
      } catch (error) {
        errorHandle(error);
      }
    },
  );

export const checkAuthAction = createAsyncThunk<void, undefined,
  {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
  }>(
    Action.CHECK_AUTH,
    async (_arg, {dispatch, extra: api}) => {
      try {
        const {data} = await api.get(APIRoute.Login);
        dispatch(loadUserData(data));
        dispatch(requireAuthorization(AuthorizationStatus.Auth));
      } catch (error) {
        errorHandle(error);
        dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
      }
    },
  );

export const loginAction = createAsyncThunk<void, AuthData,
  {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
  }>(
    Action.LOGIN,
    async ({email, password}, {dispatch, extra: api}) => {
      try {
        const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
        saveToken(data.token);
        dispatch(loadUserData(data));
        dispatch(requireAuthorization(AuthorizationStatus.Auth));
        dispatch(redirectToRoute(AppRoute.Main));
      } catch (error) {
        errorHandle(error);
        dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
      }
    },
  );

export const logoutAction = createAsyncThunk<void, undefined,
  {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
  }>(
    Action.LOGOUT,
    async (_arg, {dispatch, extra: api}) => {
      try {
        await api.delete(APIRoute.Logout);
        dropToken();
        dispatch(loadUserData({} as UserData));
        dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
      } catch (error) {
        errorHandle(error);
      }
    },
  );

export const fetchCurrentOfferAction = createAsyncThunk<void, string | undefined,
  {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
  }>(
    Action.FETCH_CURRENT_OFFER,
    async (offerId, {dispatch, extra: api}) => {
      try {
        const {data} = await api.get<OfferType>(`${APIRoute.Offers}/${offerId}`);
        dispatch(loadCurrentOffer(data));
      } catch (error) {
        errorHandle(error);
      }
    },
  );

export const fetchNearbyOffersAction = createAsyncThunk<void, string | undefined,
  {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
  }>(
    Action.FETCH_NEARBY_OFFERS,
    async (offerId, {dispatch, extra: api}) => {
      try {
        const {data} = await api.get<OfferType[]>(`${APIRoute.Offers}/${offerId}/nearby`);
        dispatch(loadNearbyOffers(data));
      } catch (error) {
        errorHandle(error);
      }
    },
  );

export const fetchCommentsAction = createAsyncThunk<void, string | undefined,
  {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
  }>(
    Action.FETCH_COMMENTS,
    async (offerId, {dispatch, extra: api}) => {
      try {
        const {data} = await api.get<CommentType[]>(`${APIRoute.Comments}/${offerId}`);
        dispatch(loadComments(data));
      } catch (error) {
        errorHandle(error);
      }
    },
  );

export const postCommentAction = createAsyncThunk<void,
  {
    offerId: string | undefined,
    rating: number,
    comment: string
  },
  {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
  }>(
    Action.POST_COMMENT,
    async ({offerId, rating, comment}, {dispatch, extra: api}) => {
      try {
        dispatch(setCommentSending());
        const {data} = await api.post(`${APIRoute.Comments}/${offerId}`, {rating: rating, comment: comment});
        dispatch(loadComments(data));
      } catch (error) {
        errorHandle(error);
        dispatch(setCommentSent());
      }
    },
  );

export const fetchFavoritesAction = createAsyncThunk<void, undefined,
  {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
  }>(
    Action.FETCH_FAVORITES,
    async (_arg, {dispatch, extra: api}) => {
      try {
        const {data} = await api.get<OfferType[]>(APIRoute.Favorite);
        dispatch(loadFavorites(data));
      } catch (error) {
        errorHandle(error);
      }
    },
  );

export const setFavoriteAction = createAsyncThunk<void,
  {
    offerId: number,
    status: number
  },
  {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
  }>(
    Action.CHANGE_FAVORITE,
    async ({offerId, status}, {dispatch, extra: api}) => {
      try {
        const {data} = await api.post(`${APIRoute.Favorite}/${offerId}/${status}`);
        dispatch(changeFavorite(data));
        dispatch(setFavoritesLoadingNeeded());
      } catch (error) {
        errorHandle(error);
      }
    },
  );

export const removeFromFavoritesAction = createAsyncThunk<void,
  {
    offerId: number,
    status: number
  },
  {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
  }>(
    Action.REMOVE_FAVORITE,
    async ({offerId, status}, {dispatch, extra: api}) => {
      try {
        const {data} = await api.post(`${APIRoute.Favorite}/${offerId}/${status}`);
        dispatch(changeFavorite(data));
      } catch (error) {
        errorHandle(error);
      }
    },
  );
