import {address, image, lorem, name, random} from 'faker';
import {OfferType} from '../types/offer-type';
import {CityName} from '../const';

export const makeFakeOffer = (price: number, rating: number): OfferType => ({
  bedrooms: random.number(10),
  city: {
    location: {
      latitude: Number(address.latitude()),
      longitude: Number(address.longitude()),
      zoom: random.number(20),
    },
    name: CityName.Amsterdam,
  },
  description: lorem.paragraph(),
  goods: Array.from({length: random.number(10)}, random.word),
  host: {
    avatarUrl: image.imageUrl(),
    id: random.number(),
    isPro: random.boolean(),
    name: name.firstName(),
  },
  id: random.number(),
  images: Array.from({length: random.number(6)}, image.imageUrl),
  isFavorite: random.boolean(),
  isPremium: random.boolean(),
  location: {
    latitude: Number(address.latitude()),
    longitude: Number(address.longitude()),
    zoom: random.number(20),
  },
  maxAdults: random.number(5),
  previewImage: image.imageUrl(),
  price: price,
  rating: rating,
  title: lorem.text(),
  type: lorem.word(),
});
