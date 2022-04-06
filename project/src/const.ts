import {CityType} from './types/offer-type';

export enum AppRoute {
  Main = '/',
  SignIn = '/login',
  Favorites = '/favorites',
  Room = '/offer/:id',
  NotFound = '/404',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum CityName {
  Amsterdam = 'Amsterdam',
  Brussels = 'Brussels',
  Cologne = 'Cologne',
  Dusseldorf = 'Dusseldorf',
  Hamburg = 'Hamburg',
  Paris = 'Paris',
}

export enum SortingOption {
  Popular = 'Popular',
  PriceLowToHigh = 'Price: low to high',
  PriceHighToLow = 'Price: high to low',
  TopRatedFirst = 'Top rated first',
}

export enum APIRoute {
  Offers = '/hotels',
  Login = '/login',
  Logout = '/logout',
  Comments = '/comments',
  Favorite = '/favorite',
}

export enum HTTPCode {
  BadRequest = 400,
  Unauthorized = 401,
  NotFound = 404,
}

export enum NameSpace {
  Data = 'DATA',
  View = 'VIEW',
  User = 'USER',
}

export const Cities: CityType[] = [
  {
    name: 'Amsterdam',
    location: {
      latitude: 52.38,
      longitude: 4.89,
      zoom: 12,
    },
  },
  {
    name: 'Brussels',
    location: {
      latitude: 50.85,
      longitude: 4.35,
      zoom: 12,
    },
  },
  {
    name: 'Cologne',
    location: {
      latitude: 50.93,
      longitude: 6.95,
      zoom: 12,
    },
  },
  {
    name: 'Dusseldorf',
    location: {
      latitude: 51.22,
      longitude: 6.77,
      zoom: 12,
    },
  },
  {
    name: 'Hamburg',
    location: {
      latitude: 53.55,
      longitude: 10.01,
      zoom: 12,
    },
  },
  {
    name: 'Paris',
    location: {
      latitude: 48.85,
      longitude: 2.35,
      zoom: 12,
    },
  },
];

export const PARIS: CityType = {
  name: 'Paris',
  location: {
    latitude: 48.85,
    longitude: 2.35,
    zoom: 12,
  },
};

export const MAX_RATING = 5;
export const MAX_PERCENT = 100;
