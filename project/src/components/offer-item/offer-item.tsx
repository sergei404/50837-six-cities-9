import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { AuthorizationStatus } from '../../const';
import { addFavoriteAction } from '../../store/api-action';
import { initialStateType } from '../../store/reducer';
import { offerType } from '../../types/offerType';

type OfferItemProps = {
  offer: offerType
  onListItemHover?: (listItemId: number | null) => void
};

function OfferItem({ onListItemHover, offer }: OfferItemProps): JSX.Element {
  const { id, isPremium, previewImage, price, isFavorite, rating, type, title } = offer;
  const authorizationStatus = useSelector((state: initialStateType) => state.authorizationStatus);

  const dispatch = useDispatch();

  const isRank = isPremium ?
    (
      <div className="place-card__mark">
        <span>Premium</span>
      </div>
    ) :
    null;

  function getFavoriteOrNotFavorite() {
    if (authorizationStatus === AuthorizationStatus.NoAuth) {
      <Navigate to={'/login'}/>;
    }
    const favorite = isFavorite ? 0 : 1;

    dispatch(addFavoriteAction({
      offerId: id,
      status: favorite,
    }));
  }

  function setMouseEnter(): void {
    if (onListItemHover) {
      onListItemHover(id);
    }
  }

  function setMouseOver(): void {
    if (onListItemHover) {
      onListItemHover(null);
    }
  }

  return (
    <article onMouseLeave={setMouseOver}
      onMouseEnter={setMouseEnter}
      className="cities__place-card place-card"
    >
      {isRank}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="#s">
          <img className="place-card__image" src={previewImage} width="260" height="200" alt={title} />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button onClick={getFavoriteOrNotFavorite} className={`place-card__bookmark-button button ${isFavorite ? 'place-card__bookmark-button--active' : ''}`} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            {isFavorite ? <span className="visually-hidden">In bookmarks</span> : <span className="visually-hidden">To bookmarks</span>}
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${rating * 100 / 5}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default OfferItem;
