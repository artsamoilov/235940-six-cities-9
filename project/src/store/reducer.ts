import {createReducer} from '@reduxjs/toolkit';
import {changeCity, changeSorting, loadOffers, requireAuthorization} from './action';
import {CityName, SortingOption, AuthorizationStatus} from '../const';
import {OfferType} from '../types/offer-type';

type InitialState = {
  cityName: string,
  sortingType: string,
  isDataLoaded: boolean,
  offers: OfferType[],
  authorizationStatus: AuthorizationStatus,
};

const initialState: InitialState = {
  cityName: CityName.Paris,
  sortingType: SortingOption.Popular,
  isDataLoaded: false,
  offers: [],
  authorizationStatus: AuthorizationStatus.Unknown,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.cityName = action.payload;
    })
    .addCase(changeSorting, (state, action) => {
      state.sortingType = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
      state.isDataLoaded = true;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    });
});
