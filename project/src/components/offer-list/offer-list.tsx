/* eslint-disable @typescript-eslint/no-unused-vars */
import {offerType} from '../../types/offerType';
import OfferItem from '../offer-item/offer-item';

type OfferListProps = {
  offerList: offerType[]
  isRoom?: boolean
  onListItemHover: (id: number) => void
};

function OfferList(props: OfferListProps): JSX.Element {

  const offers = props.offerList.map((item) => <OfferItem key={item.id} offer={item} onListItemHover={props.onListItemHover}/>);

  return (
    <div className={props.isRoom ? 'near-places__list places__list' : 'cities__places-list places__list tabs__content'}>
      {offers}
    </div>
  );
}

export default OfferList;
