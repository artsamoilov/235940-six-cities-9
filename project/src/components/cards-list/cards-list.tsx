import {useState} from 'react';
import {OfferType} from '../../types/offer-type';
import Card from '../card/card';

type PropsType = {
  offers: OfferType[],
}

export default function CardsList({offers}: PropsType): JSX.Element {
  const [, setActiveCardId] = useState(0);

  return (
    <>
      {offers.map((offer: OfferType, index: number): JSX.Element => <Card key={`card${index}`} offer={offer} setActiveCardId={setActiveCardId}/>)}
    </>
  );
}
