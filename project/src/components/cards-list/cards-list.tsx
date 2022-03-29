import {useState} from 'react';
import {OfferType} from '../../types/offer-type';
import {useAppSelector} from '../../hooks';
import {sortOffers} from '../../utils';
import Card from '../card/card';

type PropsType = {
  onCardHover: (id: number) => void,
  offers: OfferType[],
}

export default function CardsList({onCardHover, offers}: PropsType): JSX.Element {
  const [, setActiveCardId] = useState(0);
  const {cityName, sortingType} = useAppSelector((state) => state);
  const currentCityOffers = offers.filter(({city}) => city.name === cityName);
  const sortedCityOffers = sortOffers(currentCityOffers, sortingType);

  const cardHoverHandler = (id: number) => onCardHover(id);

  return (
    <>
      {sortedCityOffers.map((offer: OfferType): JSX.Element =>
        <Card key={offer.id} offer={offer} setActiveCardId={setActiveCardId} cardHoverHandler={cardHoverHandler}/>)}
    </>
  );
}
