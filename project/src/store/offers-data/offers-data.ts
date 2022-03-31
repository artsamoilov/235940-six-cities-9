import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {OffersData} from '../../types/state';
import {UserData} from '../../types/user-data';
import {OfferType} from '../../types/offer-type';

const initialState: OffersData = {
  isDataLoaded: false,
  offers: [],
  userData: {} as UserData,
  currentOffer: {} as OfferType,
  nearbyOffers: [],
  comments: [],
};

export const offersData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    loadOffers: (state, action) => {
      state.offers = action.payload;
      state.isDataLoaded = true;
    },
    loadUserData: (state, action) => {
      state.userData = action.payload;
    },
    loadCurrentOffer: (state, action) => {
      state.currentOffer = action.payload;
    },
    loadNearbyOffers: (state, action) => {
      state.nearbyOffers = action.payload;
    },
    loadComments: (state, action) => {
      state.comments = action.payload;
    },
  },
});

export const {loadOffers, loadUserData, loadCurrentOffer, loadNearbyOffers, loadComments} = offersData.actions;
