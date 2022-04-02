import {store} from '../store';
import {AuthorizationStatus} from '../const';
import {OfferType} from './offer-type';
import {UserData} from './user-data';
import {CommentType} from './comment-type';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus,
};

export type OffersData = {
  isDataLoaded: boolean,
  offers: OfferType[],
  userData: UserData,
  currentOffer: OfferType,
  nearbyOffers: OfferType[],
  comments: CommentType[],
  isFavoritesLoaded: boolean,
  favorites: OfferType[],
};

export type ViewProcess = {
  cityName: string,
  sortingType: string,
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
