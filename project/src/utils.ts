import {MAX_RATING, MAX_PERCENT} from './const';

export const getRatingPercent = (rating: number): number => rating / MAX_RATING * MAX_PERCENT;
