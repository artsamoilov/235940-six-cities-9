import {getRatingPercent, sortOffers} from './common';
import {makeFakeOffer} from './utils/mocks';
import {SortingOption} from './const';

describe('Function: getRatingPercent', () => {
  it('should return "20%" when rating is 1', () => {
    expect(getRatingPercent(1))
      .toBe('20%');
  });
});

describe('Function: sortOffers', () => {
  const offers = [
    makeFakeOffer(100, 2.5),
    makeFakeOffer(300, 1),
    makeFakeOffer(200, 5),
  ];

  it('should return original array when Popular sorting option selected', () => {
    expect(sortOffers(offers, SortingOption.Popular))
      .toBe(offers);
  });

  it('should return low price first when PriceLowToHigh sorting option selected', () => {
    expect(sortOffers(offers, SortingOption.PriceLowToHigh))
      .toBe([{price: 100}, {price: 200}, {price: 300}]);
  });

  it('should return high price first when PriceHighToLow sorting option selected', () => {
    expect(sortOffers(offers, SortingOption.PriceHighToLow))
      .toBe([{price: 300}, {price: 200}, {price: 100}]);
  });

  it('should return high rating first when TopRatedFirst sorting option selected', () => {
    expect(sortOffers(offers, SortingOption.TopRatedFirst))
      .toBe([{rating: 5}, {rating: 2.5}, {rating: 1}]);
  });
});
