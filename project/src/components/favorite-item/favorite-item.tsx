// import { useDispatch, useSelector } from 'react-redux';
// import { Link, Navigate } from 'react-router-dom';
// import { AuthorizationStatus } from '../../const';
// import { addFavoriteAction } from '../../store/api-action';
// import { initialStateType } from '../../store/reducer';
import { Link } from 'react-router-dom';
import { offerType } from '../../types/offerType';
import OfferItem from '../offer-item/offer-item';

type FavoriteItemProps = {
  offer: offerType
  name: string
};

function FavoriteItem({offer, name}: FavoriteItemProps): JSX.Element {

  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <Link className="locations__item-link" to={''}>
            <span>{name}</span>
          </Link>
        </div>
      </div>
      <div className="favorites__places">
        <OfferItem offer={offer}/>
      </div>
    </li>);


}

export default FavoriteItem;

