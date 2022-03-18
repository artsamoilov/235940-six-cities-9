import {createReducer} from '@reduxjs/toolkit';
import {changeCity, getOffers} from './action';
import {Offers} from '../mocks/offers';
import {OfferType} from '../types/offer-type';
import {City} from '../const';

const initialState = {
  city: City.Amsterdam,
  offers: [] as OfferType[],
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(getOffers, (state) => {
      state.offers = Offers.filter(({city}) => city.name === state.city);
    });
});
