import {NameSpace} from '../../const';
import {State} from '../../types/state';

export const getCityName = (state: State): string => state[NameSpace.View].cityName;

export const getSortingType = (state: State): string => state[NameSpace.View].sortingType;
