import {address, image, lorem, name, datatype, random, internet} from 'faker';
import {OfferType} from '../types/offer-type';
import {CityName} from '../const';
import {UserData} from '../types/user-data';
import {CommentType} from '../types/comment-type';

const DEFAULT_LENGTH = 1;

export const makeFakeOffer = (price = 100, rating = 3.5, isFavorite = false): OfferType => ({
  bedrooms: datatype.number(3),
  city: {
    location: {
      latitude: Number(address.latitude()),
      longitude: Number(address.longitude()),
      zoom: datatype.number(10),
    },
    name: CityName.Amsterdam,
  },
  description: lorem.paragraph(),
  goods: Array.from({length: datatype.number(DEFAULT_LENGTH)}, random.word),
  host: {
    avatarUrl: image.avatar(),
    id: datatype.number(),
    isPro: datatype.boolean(),
    name: name.firstName(),
  },
  id: datatype.number(),
  images: Array.from({length: datatype.number(DEFAULT_LENGTH)}, image.imageUrl),
  isFavorite: isFavorite,
  isPremium: datatype.boolean(),
  location: {
    latitude: Number(address.latitude()),
    longitude: Number(address.longitude()),
    zoom: datatype.number(10),
  },
  maxAdults: datatype.number(5),
  previewImage: image.imageUrl(),
  price: price,
  rating: rating,
  title: lorem.sentence(3, 2),
  type: lorem.word(),
});

export const makeFakeOffersList = (): OfferType[] =>
  Array.from({length: DEFAULT_LENGTH}, () => makeFakeOffer(datatype.number(1000), datatype.number(5)));

export const makeFakeUserData = (): UserData => ({
  avatarUrl: image.avatar(),
  email: internet.email(),
  id: datatype.number(),
  isPro: datatype.boolean(),
  name: name.firstName(),
  token: datatype.uuid(),
});

export const makeFakeComment = (): CommentType => ({
  comment: lorem.paragraph(),
  date: String(datatype.datetime()),
  id: datatype.number(),
  rating: datatype.number(5),
  user: {
    avatarUrl: image.avatar(),
    id: datatype.number(),
    isPro: datatype.boolean(),
    name: name.firstName(),
  },
});

export const makeFakeCommentsList = (): CommentType[] => Array.from({length: DEFAULT_LENGTH}, makeFakeComment);
