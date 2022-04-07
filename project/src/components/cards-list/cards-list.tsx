import {memo, useCallback} from 'react';
import {OfferType} from '../../types/offer-type';
import {useAppSelector} from '../../hooks';
import {sortOffers} from '../../common';
import Card from '../card/card';

type PropsType = {
  onCardHover?: (id: number) => void,
  offers: OfferType[],
}

function CardsList({onCardHover, offers}: PropsType): JSX.Element {
  const {cityName, sortingType} = useAppSelector(({VIEW}) => VIEW);
  const currentCityOffers = offers.filter(({city}) => city.name === cityName);
  const sortedCityOffers = sortOffers(currentCityOffers, sortingType);

  if (onCardHover) {
    const onCurrentCardHover = useCallback((id: number) => onCardHover(id), [onCardHover]);

    return (
      <>
        {sortedCityOffers.map((offer: OfferType): JSX.Element =>
          <Card key={offer.id} offer={offer} onCurrentCardHover={onCurrentCardHover} />)}
      </>
    );
  }

  return (
    <>
      {sortedCityOffers.map((offer: OfferType): JSX.Element =>
        <Card key={offer.id} offer={offer} onCurrentCardHover={undefined} />)}
    </>
  );
}

export default memo(CardsList);
