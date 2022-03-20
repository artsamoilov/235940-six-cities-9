import {createReducer} from '@reduxjs/toolkit';
import {changeCity} from './action';
import {Offers} from '../mocks/offers';
import {CityName} from '../const';

const initialState = {
  cityName: CityName.Paris,
  offers: Offers,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.cityName = action.payload;
    });
});
