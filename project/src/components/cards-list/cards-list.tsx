import {memo} from 'react';
import {OfferType} from '../../types/offer-type';
import {useAppSelector} from '../../hooks';
import {sortOffers} from '../../common';
import {getCityName, getSortingType} from '../../store/view-process/selectors';
import Card from '../card/card';

type PropsType = {
  onCardHover?: (id: number) => void,
  offers: OfferType[],
}

function CardsList({onCardHover, offers}: PropsType): JSX.Element {
  const cityName = useAppSelector(getCityName);
  const sortingType = useAppSelector(getSortingType);

  const onCurrentCardHover = onCardHover ? (id: number) => onCardHover(id) : undefined;

  const currentCityOffers = offers.filter(({city}) => city.name === cityName);
  const sortedCityOffers = sortOffers(currentCityOffers, sortingType);

  return (
    <>
      {sortedCityOffers.map((offer: OfferType): JSX.Element =>
        <Card key={offer.id} offer={offer} onCurrentCardHover={onCurrentCardHover} />)}
    </>
  );
}

export default memo(CardsList);
