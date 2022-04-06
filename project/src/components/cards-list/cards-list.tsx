import {memo, useCallback} from 'react';
import {OfferType} from '../../types/offer-type';
import {useAppSelector} from '../../hooks';
import {sortOffers} from '../../common';
import Card from '../card/card';

type PropsType = {
  handleCardHover?: (id: number) => void,
  offers: OfferType[],
}

function CardsList({handleCardHover, offers}: PropsType): JSX.Element {
  const {cityName, sortingType} = useAppSelector(({VIEW}) => VIEW);
  const currentCityOffers = offers.filter(({city}) => city.name === cityName);
  const sortedCityOffers = sortOffers(currentCityOffers, sortingType);

  const cardHoverHandler = handleCardHover ? useCallback((id: number) => handleCardHover(id), [handleCardHover]) : undefined;

  return (
    <>
      {sortedCityOffers.map((offer: OfferType): JSX.Element =>
        <Card key={offer.id} offer={offer} cardHoverHandler={cardHoverHandler} />)}
    </>
  );
}

export default memo(CardsList);
