import {useCallback} from 'react';
import {OfferType} from '../../types/offer-type';
import {useAppSelector} from '../../hooks';
import {sortOffers} from '../../utils';
import Card from '../card/card';

type PropsType = {
  handleCardHover: (id: number) => void,
  offers: OfferType[],
}

export default function CardsList({handleCardHover, offers}: PropsType): JSX.Element {
  const {cityName, sortingType} = useAppSelector((state) => state);
  const currentCityOffers = offers.filter(({city}) => city.name === cityName);
  const sortedCityOffers = sortOffers(currentCityOffers, sortingType);

  const cardHoverHandler = useCallback((id: number) => handleCardHover(id), []);

  return (
    <>
      {sortedCityOffers.map((offer: OfferType): JSX.Element =>
        <Card key={offer.id} offer={offer} cardHoverHandler={cardHoverHandler}/>)}
    </>
  );
}
