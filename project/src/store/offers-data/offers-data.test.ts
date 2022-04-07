import {UserData} from '../../types/user-data';
import {OfferType} from '../../types/offer-type';
import {makeFakeCommentsList, makeFakeOffersList, makeFakeUserData} from '../../utils/mocks';
import {
  offersData,
  loadOffers,
  loadUserData,
  loadCurrentOffer,
  loadNearbyOffers,
  loadComments,
  loadFavorites,
  changeFavorite,
  setFavoritesLoadingNeeded
} from './offers-data';

const fakeOffers = makeFakeOffersList();
const fakeUserData = makeFakeUserData();
const fakeComments = makeFakeCommentsList();

describe('Reducer: offersData', () => {
  it('should return initial state without parameters', () => {
    expect(offersData.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        isDataLoaded: false,
        offers: [],
        userData: {} as UserData,
        currentOffer: {} as OfferType,
        nearbyOffers: [],
        isCommentSent: true,
        comments: [],
        isFavoritesLoaded: false,
        isFavoritesUpdated: false,
        favorites: [],
      });
  });

  it('should update offers by loadOffers', () => {
    const state = {
      isDataLoaded: false,
      offers: [],
      userData: {} as UserData,
      currentOffer: {} as OfferType,
      nearbyOffers: [],
      isCommentSent: true,
      comments: [],
      isFavoritesLoaded: false,
      isFavoritesUpdated: false,
      favorites: [],
    };
    expect(offersData.reducer(state, loadOffers(fakeOffers)))
      .toEqual({
        isDataLoaded: true,
        offers: fakeOffers,
        userData: {} as UserData,
        currentOffer: {} as OfferType,
        nearbyOffers: [],
        isCommentSent: true,
        comments: [],
        isFavoritesLoaded: false,
        isFavoritesUpdated: false,
        favorites: [],
      });
  });

  it('should update userData by loadUserData', () => {
    const state = {
      isDataLoaded: false,
      offers: [],
      userData: {} as UserData,
      currentOffer: {} as OfferType,
      nearbyOffers: [],
      isCommentSent: true,
      comments: [],
      isFavoritesLoaded: false,
      isFavoritesUpdated: false,
      favorites: [],
    };
    expect(offersData.reducer(state, loadUserData(fakeUserData)))
      .toEqual({
        isDataLoaded: false,
        offers: [],
        userData: fakeUserData,
        currentOffer: {} as OfferType,
        nearbyOffers: [],
        isCommentSent: true,
        comments: [],
        isFavoritesLoaded: false,
        isFavoritesUpdated: false,
        favorites: [],
      });
  });

  it('should update currentOffer by loadCurrentOffer', () => {
    const state = {
      isDataLoaded: false,
      offers: [],
      userData: {} as UserData,
      currentOffer: {} as OfferType,
      nearbyOffers: [],
      isCommentSent: true,
      comments: [],
      isFavoritesLoaded: false,
      isFavoritesUpdated: false,
      favorites: [],
    };
    expect(offersData.reducer(state, loadCurrentOffer(fakeOffers[0])))
      .toEqual({
        isDataLoaded: false,
        offers: [],
        userData: {} as UserData,
        currentOffer: fakeOffers[0],
        nearbyOffers: [],
        isCommentSent: true,
        comments: [],
        isFavoritesLoaded: false,
        isFavoritesUpdated: false,
        favorites: [],
      });
  });

  it('should update nearbyOffers by loadNearbyOffers', () => {
    const state = {
      isDataLoaded: false,
      offers: [],
      userData: {} as UserData,
      currentOffer: {} as OfferType,
      nearbyOffers: [],
      isCommentSent: true,
      comments: [],
      isFavoritesLoaded: false,
      isFavoritesUpdated: false,
      favorites: [],
    };
    expect(offersData.reducer(state, loadNearbyOffers(fakeOffers)))
      .toEqual({
        isDataLoaded: false,
        offers: [],
        userData: {} as UserData,
        currentOffer: {} as OfferType,
        nearbyOffers: fakeOffers,
        isCommentSent: true,
        comments: [],
        isFavoritesLoaded: false,
        isFavoritesUpdated: false,
        favorites: [],
      });
  });

  it('should update comments by loadComments', () => {
    const state = {
      isDataLoaded: false,
      offers: [],
      userData: {} as UserData,
      currentOffer: {} as OfferType,
      nearbyOffers: [],
      isCommentSent: true,
      comments: [],
      isFavoritesLoaded: false,
      isFavoritesUpdated: false,
      favorites: [],
    };
    expect(offersData.reducer(state, loadComments(fakeComments)))
      .toEqual({
        isDataLoaded: false,
        offers: [],
        userData: {} as UserData,
        currentOffer: {} as OfferType,
        nearbyOffers: [],
        isCommentSent: true,
        comments: fakeComments,
        isFavoritesLoaded: false,
        isFavoritesUpdated: false,
        favorites: [],
      });
  });

  it('should update favorites by loadFavorites', () => {
    const state = {
      isDataLoaded: false,
      offers: [],
      userData: {} as UserData,
      currentOffer: {} as OfferType,
      nearbyOffers: [],
      isCommentSent: true,
      comments: [],
      isFavoritesLoaded: false,
      isFavoritesUpdated: false,
      favorites: [],
    };
    expect(offersData.reducer(state, loadFavorites(fakeOffers)))
      .toEqual({
        isDataLoaded: false,
        offers: [],
        userData: {} as UserData,
        currentOffer: {} as OfferType,
        nearbyOffers: [],
        isCommentSent: true,
        comments: [],
        isFavoritesLoaded: true,
        isFavoritesUpdated: true,
        favorites: fakeOffers,
      });
  });

  it('should change favorites by changeFavorite', () => {
    const state = {
      isDataLoaded: false,
      offers: fakeOffers,
      userData: {} as UserData,
      currentOffer: {} as OfferType,
      nearbyOffers: [],
      isCommentSent: true,
      comments: [],
      isFavoritesLoaded: true,
      isFavoritesUpdated: true,
      favorites: [],
    };
    expect(offersData.reducer(state, changeFavorite(fakeOffers[0])))
      .toEqual({
        isDataLoaded: false,
        offers: [{...fakeOffers[0], isFavorite: true}],
        userData: {} as UserData,
        currentOffer: {} as OfferType,
        nearbyOffers: [],
        isCommentSent: true,
        comments: [],
        isFavoritesLoaded: true,
        isFavoritesUpdated: false,
        favorites: [],
      });
  });

  it('should update isFavoritesLoaded by setFavoritesLoadingNeeded', () => {
    const state = {
      isDataLoaded: false,
      offers: [],
      userData: {} as UserData,
      currentOffer: {} as OfferType,
      nearbyOffers: [],
      isCommentSent: true,
      comments: [],
      isFavoritesLoaded: true,
      isFavoritesUpdated: true,
      favorites: [],
    };
    expect(offersData.reducer(state, setFavoritesLoadingNeeded()))
      .toEqual({
        isDataLoaded: false,
        offers: [],
        userData: {} as UserData,
        currentOffer: {} as OfferType,
        nearbyOffers: [],
        isCommentSent: true,
        comments: [],
        isFavoritesLoaded: false,
        isFavoritesUpdated: true,
        favorites: [],
      });
  });
});
