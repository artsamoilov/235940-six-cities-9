import {createReducer} from '@reduxjs/toolkit';
import {changeCity, getOffers} from './action';
import {Offers} from '../mocks/offers';
import {CityName} from '../const';

const getCityOffers = (cityName: string) => Offers.filter(({city}) => city.name === cityName);

const initialState = {
  cityName: CityName.Paris,
  offers: getCityOffers(CityName.Paris),
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.cityName = action.payload;
    })
    .addCase(getOffers, (state) => {
      state.offers = getCityOffers(state.cityName);
    });
});
