import {createAction} from '@reduxjs/toolkit';
import {OfferType} from '../types/offer-type';
import {AuthorizationStatus} from '../const';

const Action = {
  CHANGE_CITY: 'CHANGE_CITY',
  CHANGE_SORTING: 'CHANGE_SORTING',
  LOAD_OFFERS: 'LOAD_OFFERS',
  REQUIRE_AUTH: 'REQUIRE_AUTH',
};

export const changeCity = createAction(Action.CHANGE_CITY, (value) => ({payload: value}));

export const changeSorting = createAction(Action.CHANGE_SORTING, (value) => ({payload: value}));

export const loadOffers = createAction<OfferType[]>(Action.LOAD_OFFERS);

export const requireAuthorization = createAction<AuthorizationStatus>(Action.REQUIRE_AUTH);
