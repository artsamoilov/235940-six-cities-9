export enum AppRoute {
  Main = '/',
  SignIn = '/login',
  Favorites = '/favorites',
  Room = '/offer/:id',
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

export const MAX_RATING = 5;
export const MAX_PERCENT = 100;
