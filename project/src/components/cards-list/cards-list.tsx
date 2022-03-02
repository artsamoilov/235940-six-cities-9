import {useState} from 'react';
import {OfferType} from '../../types/offer-type';
import Card from '../card/card';

type PropsType = {
  offers: OfferType[],
}

export default function CardsList({offers}: PropsType): JSX.Element {
  const [activeCardId, setActiveCardId] = useState(0);
  console.log(activeCardId);

  return (
    <>
      {offers.map((offer: OfferType): JSX.Element => <Card key={'card'} offer={offer} setActiveCardId={setActiveCardId}/>)}
    </>
  );
}
