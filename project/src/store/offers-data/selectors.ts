import {NameSpace} from '../../const';
import {State} from '../../types/state';
import {OfferType} from '../../types/offer-type';
import {UserData} from '../../types/user-data';
import {CommentType} from '../../types/comment-type';

export const getDataLoadingStatus = (state: State): boolean => state[NameSpace.Data].isDataLoaded;

export const getOffers = (state: State): OfferType[] => state[NameSpace.Data].offers;

export const getUserData = (state: State): UserData => state[NameSpace.Data].userData;

export const getCurrentOfferLoadingStatus = (state: State): boolean => state[NameSpace.Data].isCurrentOfferLoaded;

export const getCurrentOffer = (state: State): OfferType => state[NameSpace.Data].currentOffer;

export const getNearbyOffers = (state: State): OfferType[] => state[NameSpace.Data].nearbyOffers;

export const getCommentSendingStatus = (state: State): boolean => state[NameSpace.Data].isCommentSent;

export const getComments = (state: State): CommentType[] => state[NameSpace.Data].comments;

export const getFavoritesLoadingStatus = (state: State): boolean => state[NameSpace.Data].isFavoritesLoaded;

export const getFavoritesUpdatingStatus = (state: State): boolean => state[NameSpace.Data].isFavoritesUpdated;

export const getFavorites = (state: State): OfferType[] => state[NameSpace.Data].favorites;
