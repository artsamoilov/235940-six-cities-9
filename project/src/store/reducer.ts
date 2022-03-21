import {createReducer} from '@reduxjs/toolkit';
import {changeCity, changeSorting} from './action';
import {Offers} from '../mocks/offers';
import {CityName, SortingOption} from '../const';

const initialState = {
  cityName: CityName.Paris,
  sortingType: SortingOption.Popular,
  offers: Offers,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.cityName = action.payload;
    })
    .addCase(changeSorting, (state, action) => {
      state.sortingType = action.payload;
    });
});
