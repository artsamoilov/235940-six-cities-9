import {getRatingPercent, sortOffers} from './common';
import {makeFakeOffer} from './utils/mocks';
import {SortingOption} from './const';

const HIGH_PRICE = 300;
const MID_PRICE = 200;
const LOW_PRICE = 100;
const HIGH_RATING = 4.8;
const MID_RATING = 2.9;
const LOW_RATING = 1;

describe('Function: getRatingPercent', () => {
  it('should return 20 when rating is 1', () => {
    expect(getRatingPercent(LOW_RATING)).toBe(20);
  });
});

describe('Function: sortOffers', () => {
  const offers = [
    makeFakeOffer(LOW_PRICE, MID_RATING),
    makeFakeOffer(HIGH_PRICE, LOW_RATING),
    makeFakeOffer(MID_PRICE, HIGH_RATING),
  ];

  it('should return original array when Popular sorting option selected.', () => {
    expect(sortOffers(offers, SortingOption.Popular)).toBe(offers);
  });

  it('should return low price first when PriceLowToHigh sorting option selected', () => {
    expect(sortOffers(offers, SortingOption.PriceLowToHigh)[0].price).toBe(LOW_PRICE);
    expect(sortOffers(offers, SortingOption.PriceLowToHigh)[1].price).toBe(MID_PRICE);
    expect(sortOffers(offers, SortingOption.PriceLowToHigh)[2].price).toBe(HIGH_PRICE);
  });

  it('should return high price first when PriceHighToLow sorting option selected', () => {
    expect(sortOffers(offers, SortingOption.PriceHighToLow)[0].price).toBe(HIGH_PRICE);
    expect(sortOffers(offers, SortingOption.PriceHighToLow)[1].price).toBe(MID_PRICE);
    expect(sortOffers(offers, SortingOption.PriceHighToLow)[2].price).toBe(LOW_PRICE);
  });

  it('should return high rating first when TopRatedFirst sorting option selected', () => {
    expect(sortOffers(offers, SortingOption.TopRatedFirst)[0].rating).toBe(HIGH_RATING);
    expect(sortOffers(offers, SortingOption.TopRatedFirst)[1].rating).toBe(MID_RATING);
    expect(sortOffers(offers, SortingOption.TopRatedFirst)[2].rating).toBe(LOW_RATING);
  });
});
