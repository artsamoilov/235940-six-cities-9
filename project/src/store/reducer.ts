import {createReducer} from '@reduxjs/toolkit';
import {changeCity, changeSorting, loadOffers} from './action';
import {CityName, SortingOption} from '../const';
import {OfferType} from '../types/offer-type';

type InitialState = {
  cityName: string,
  sortingType: string,
  offers: OfferType[],
};

const initialState: InitialState = {
  cityName: CityName.Paris,
  sortingType: SortingOption.Popular,
  offers: [],
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
    });
});
