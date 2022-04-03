import {viewProcess, changeCity, changeSorting} from './view-process';
import {CityName, SortingOption} from '../../const';

describe('Reducer: viewProcess', () => {
  it('should return initial state without parameters', () => {
    expect(viewProcess.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({cityName: CityName.Paris, sortingType: SortingOption.Popular});
  });

  it('should change cityName to the given value', () => {
    const state = {cityName: CityName.Paris, sortingType: SortingOption.Popular};
    expect(viewProcess.reducer(state, changeCity(CityName.Amsterdam)))
      .toEqual({cityName: CityName.Amsterdam, sortingType: SortingOption.Popular});
  });

  it('should change sortingType to the given value', () => {
    const state = {cityName: CityName.Paris, sortingType: SortingOption.Popular};
    expect(viewProcess.reducer(state, changeSorting(SortingOption.TopRatedFirst)))
      .toEqual({cityName: CityName.Paris, sortingType: SortingOption.TopRatedFirst});
  });
});
