import {useState, MouseEvent} from 'react';
import {OfferType} from '../../types/offer-type';
import Card from '../card/card';

type PropsType = {
  offers: OfferType[],
  onCardHover: (id: number) => void,
}

export default function CardsList({offers, onCardHover}: PropsType): JSX.Element {
  const [, setActiveCardId] = useState(0);

  const cardHoverHandler = (id: number) => onCardHover(id);

  return (
    <>
      {offers.map((offer: OfferType): JSX.Element =>
        <Card
          key={offer.id}
          offer={offer}
          setActiveCardId={setActiveCardId}
          cardHoverHandler={cardHoverHandler}
        />)}
    </>
  );
}
