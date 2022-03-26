import {createReducer} from '@reduxjs/toolkit';
import {changeCity, changeSorting, loadOffers, loadUserData, requireAuthorization} from './action';
import {CityName, SortingOption, AuthorizationStatus} from '../const';
import {OfferType} from '../types/offer-type';
import {UserData} from '../types/user-data';

type InitialState = {
  cityName: string,
  sortingType: string,
  isDataLoaded: boolean,
  offers: OfferType[],
  authorizationStatus: AuthorizationStatus,
  userData: UserData,
};

const initialState: InitialState = {
  cityName: CityName.Paris,
  sortingType: SortingOption.Popular,
  isDataLoaded: false,
  offers: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  userData: {} as UserData,
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
    })
    .addCase(loadUserData, (state, action) => {
      state.userData = action.payload;
    });
});
