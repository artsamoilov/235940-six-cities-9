import {createAsyncThunk} from '@reduxjs/toolkit';
import {api, store} from './index';
import {APIRoute} from '../const';
import {OfferType} from '../types/offer-type';
import {loadOffers} from './action';

export const fetchOffersAction = createAsyncThunk(
  'LOAD_OFFERS',
  async () => {
    const {data} = await api.get<OfferType[]>(APIRoute.Offers);
    store.dispatch(loadOffers(data));
  },
);
