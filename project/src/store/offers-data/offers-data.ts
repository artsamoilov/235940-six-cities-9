import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {OffersData} from '../../types/state';
import {UserData} from '../../types/user-data';
import {OfferType} from '../../types/offer-type';

const initialState: OffersData = {
  isDataLoaded: false,
  offers: [],
  userData: {} as UserData,
  isCurrentOfferLoaded: false,
  currentOffer: {} as OfferType,
  nearbyOffers: [],
  isCommentSent: true,
  comments: [],
  isFavoritesLoaded: false,
  isFavoritesUpdated: false,
  favorites: [],
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
    setCurrentOfferLoadingNeeded: (state) => {
      state.isCurrentOfferLoaded = false;
    },
    loadCurrentOffer: (state, action) => {
      state.currentOffer = action.payload;
      state.isCurrentOfferLoaded = true;
    },
    loadNearbyOffers: (state, action) => {
      state.nearbyOffers = action.payload;
    },
    loadComments: (state, action) => {
      state.comments = action.payload;
      state.isCommentSent = true;
    },
    loadFavorites: (state, action) => {
      state.favorites = action.payload;
      state.isFavoritesLoaded = true;
      state.isFavoritesUpdated = true;
    },
    changeFavorite: (state, action) => {
      const currentOffer = state.offers.find((offer) => offer.id === action.payload.id);
      if (currentOffer) {
        currentOffer.isFavorite = action.payload.isFavorite;
      }
      state.isFavoritesUpdated = false;
    },
    setFavoritesEmpty: (state) => {
      state.isCurrentOfferLoaded = false;
      state.isFavoritesUpdated = false;
    },
    setFavoritesLoadingNeeded: (state) => {
      state.isFavoritesUpdated = false;
      state.isFavoritesLoaded = false;
    },
    setCommentSending: (state) => {
      state.isCommentSent = false;
    },
    setCommentSent: (state) => {
      state.isCommentSent = true;
    },
  },
});

export const {
  loadOffers,
  loadUserData,
  loadCurrentOffer,
  loadNearbyOffers,
  loadComments,
  loadFavorites,
  changeFavorite,
  setFavoritesLoadingNeeded,
  setCommentSending,
  setCommentSent,
  setFavoritesEmpty,
  setCurrentOfferLoadingNeeded
} = offersData.actions;
