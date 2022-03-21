import {MAX_RATING, MAX_PERCENT, SortingOption} from './const';
import {OfferType} from './types/offer-type';

export const getRatingPercent = (rating: number): number => rating / MAX_RATING * MAX_PERCENT;

export const sortOffers = (offers: OfferType[], sortingType: string): OfferType[] => {
  switch (sortingType) {
    case SortingOption.PriceLowToHigh:
      return offers.slice().sort((offerA, offerB) => offerA.price - offerB.price);
    case SortingOption.PriceHighToLow:
      return offers.slice().sort((offerA, offerB) => offerB.price - offerA.price);
    case SortingOption.TopRatedFirst:
      return offers.slice().sort((offerA, offerB) => offerB.rating - offerA.rating);
    default:
      return offers;
  }
}
