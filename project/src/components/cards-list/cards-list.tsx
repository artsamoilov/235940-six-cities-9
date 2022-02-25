import {OfferType} from '../../const';
import Card from '../card/card';

type PropsType = {
  offers: OfferType[],
}

export default function CardsList({offers}: PropsType): JSX.Element {
  return (
    <>
      {offers.map((offer: OfferType): JSX.Element => <Card key={offer.id} offer={offer}/>)}
    </>
  );
}
