import { Link } from 'react-router-dom';
import { offerType } from '../../types/offerType';

type OfferItemProps = {
  setOfferActive?:  (id: number | null) => void
  offer: offerType
};

function OfferItem({setOfferActive, offer}: OfferItemProps): JSX.Element {
  const {id, rank, gallery, title, price, bookmark, rating, features: {category}} = offer;


  function setMouseEnterId(): void {
    if (setOfferActive) {
      setOfferActive(id);
    }
  }

  function setMouseOver(): void {
    if (setOfferActive) {
      setOfferActive(null);
    }
  }

  const isRank = rank ?
    (
      <div className="place-card__mark">
        <span>Premium</span>
      </div>
    ) :
    null;

  return (
    <article onMouseLeave={setMouseOver}
      onMouseEnter={setMouseEnterId} className="cities__place-card place-card"
    >
      { isRank }
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="#s">
          <img className="place-card__image" src={gallery[id]} width="260" height="200" alt={title[id]} />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price[id]}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          {bookmark ?
            <button className="place-card__bookmark-button place-card__bookmark-button--active button" type="button">
              <svg className="place-card__bookmark-icon" width="18" height="19">
                <use xlinkHref="#icon-bookmark"></use>
              </svg>
              <span className="visually-hidden">In bookmarks</span>
            </button> :
            <button className="place-card__bookmark-button button" type="button">
              <svg className="place-card__bookmark-icon" width="18" height="19">
                <use xlinkHref="#icon-bookmark"></use>
              </svg>
              <span className="visually-hidden">To bookmarks</span>
            </button>}
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${rating}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${id}`}>{title[id]}</Link>
        </h2>
        <p className="place-card__type">{category}</p>
      </div>
    </article>
  );
}

export default OfferItem;
