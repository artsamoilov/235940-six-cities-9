import {address, image, lorem, name, datatype, random} from 'faker';
import {OfferType} from '../types/offer-type';
import {CityName} from '../const';

export const makeFakeOffer = (price: number, rating: number): OfferType => ({
  bedrooms: datatype.number(10),
  city: {
    location: {
      latitude: Number(address.latitude()),
      longitude: Number(address.longitude()),
      zoom: datatype.number(20),
    },
    name: CityName.Amsterdam,
  },
  description: lorem.paragraph(),
  goods: Array.from({length: datatype.number(10)}, random.word),
  host: {
    avatarUrl: image.imageUrl(),
    id: datatype.number(),
    isPro: datatype.boolean(),
    name: name.firstName(),
  },
  id: datatype.number(),
  images: Array.from({length: datatype.number(6)}, image.imageUrl),
  isFavorite: datatype.boolean(),
  isPremium: datatype.boolean(),
  location: {
    latitude: Number(address.latitude()),
    longitude: Number(address.longitude()),
    zoom: datatype.number(20),
  },
  maxAdults: datatype.number(5),
  previewImage: image.imageUrl(),
  price: price,
  rating: rating,
  title: lorem.text(),
  type: lorem.word(),
});
