import {createAction} from '@reduxjs/toolkit';
import {OfferType} from '../types/offer-type';
import {AppRoute, AuthorizationStatus} from '../const';
import {UserData} from '../types/user-data';

const Action = {
  CHANGE_CITY: 'CHANGE_CITY',
  CHANGE_SORTING: 'CHANGE_SORTING',
  LOAD_OFFERS: 'LOAD_OFFERS',
  REQUIRE_AUTH: 'REQUIRE_AUTH',
  REDIRECT: 'REDIRECT',
  SET_ERROR: 'SET_ERROR',
  LOAD_USER_DATA: 'LOAD_USER_DATA',
};

export const changeCity = createAction(Action.CHANGE_CITY, (value) => ({payload: value}));

export const changeSorting = createAction(Action.CHANGE_SORTING, (value) => ({payload: value}));

export const loadOffers = createAction<OfferType[]>(Action.LOAD_OFFERS);

export const requireAuthorization = createAction<AuthorizationStatus>(Action.REQUIRE_AUTH);

export const loadUserData = createAction<UserData>(Action.LOAD_USER_DATA);

export const redirectToRoute = createAction<AppRoute>(Action.REDIRECT);
