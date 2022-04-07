/* eslint-disable react-hooks/exhaustive-deps */
import FeedbackForm from '../feedback-form/feedback-form';
import { Navigate, useParams } from 'react-router-dom';
import Map from '../map/map';
import OfferList from '../offer-list/offer-list';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { initialStateType } from '../../store/reducer';
import { addFavoriteAction, offerFetchAction } from '../../store/api-action';
import { AuthorizationStatus } from '../../const';
import ListReview from '../list-review/list-review';

function Room(): JSX.Element {
  const [selectedPoint, setSelectedPoint] = useState<number | null>(null);

  const onListItemHover = (listItem: number | null) => {
    setSelectedPoint(listItem);
  };

  const { id } = useParams();
  const numberId = Number(id);
  const dispatch = useDispatch();

  const offer = useSelector((state: initialStateType) => state.offer);
  const authorizationStatus = useSelector((state: initialStateType) => state.authorizationStatus);
  const nearby = useSelector((state: initialStateType) => state.nearby);
  const comments = useSelector((state: initialStateType) => state.comments);

  useEffect(() => {
    dispatch(offerFetchAction(Number(id)));
  }, [dispatch, id, comments.length]);

  function getFavoriteOrNotFavorite() {
    if (authorizationStatus === AuthorizationStatus.NoAuth) {
      <Navigate to={'/login'}/>;
    }
    const favorite = offer?.isFavorite ? 0 : 1;

    dispatch(addFavoriteAction({
      offerId: numberId,
      status: favorite,
    }));
  }

  const  coordinates = offer ?
    [...nearby.map((item) => ({
      location: item.location,
      id: item.id,
    })), {location: offer.location, id: offer.id, isSelected: true} ] :
    nearby.map((item) => ({
      location: item.location,
      id: item.id,
    }));


  return (
    <main className="page__main page__main--property">
      <section className="property">
        <div className="property__gallery-container container">
          <div className="property__gallery">
            {offer?.images.slice(0, 6).map((image) => (
              <div key={image} className="property__image-wrapper">
                <img className="property__image" src={image} alt="Photo_studio" />
              </div>
            ))}

          </div>
        </div>
        <div className="property__container container">
          <div className="property__wrapper">
            {
              offer?.isPremium ?
                <div className="property__mark">
                  <span>Premium</span>
                </div> :
                ''
            }
            <div className="property__name-wrapper">
              <h1 className="property__name">
                {offer?.title}
              </h1>
              <button onClick={getFavoriteOrNotFavorite} className={`place-card__bookmark-button button ${offer?.isFavorite ? 'place-card__bookmark-button--active' : ''}`} type="button">
                <svg className="place-card__bookmark-icon" width="18" height="19">
                  <use xlinkHref="#icon-bookmark"></use>
                </svg>
                {offer?.isFavorite ? <span className="visually-hidden">In bookmarks</span> : <span className="visually-hidden">To bookmarks</span>}
              </button>
            </div>
            <div className="property__rating rating">
              <div className="property__stars rating__stars">
                <span style={{ width: `${offer ? offer.rating * 100 / 5 : 0}%`  }}></span>
                <span className="visually-hidden">Rating</span>
              </div>
              <span className="property__rating-value rating__value">{offer?.rating}</span>
            </div>
            <ul className="property__features">
              <li className="property__feature property__feature--entire">
                {offer?.type}
              </li>
              <li className="property__feature property__feature--bedrooms">
                {offer?.bedrooms} Bedrooms
              </li>
              <li className="property__feature property__feature--adults">
                Max {offer?.maxAdults} adults
              </li>
            </ul>
            <div className="property__price">
              <b className="property__price-value">&euro;{offer?.price}</b>
              <span className="property__price-text">&nbsp;night</span>
            </div>
            <div className="property__inside">
              <h2 className="property__inside-title">What&apos;s inside</h2>
              <ul className="property__inside-list">
                {offer?.goods.map((good) => (
                  <li key={good} className="property__inside-item">
                    {good}
                  </li>
                ))}
              </ul>
            </div>
            <div className="property__host">
              <h2 className="property__host-title">Meet the host</h2>
              <div className="property__host-user user">
                <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                  <img className="property__avatar user__avatar" src={offer?.host.avatarUrl} width="74" height="74" alt="Host avatar" />
                </div>
                <span className="property__user-name">
                  {offer?.host.name}
                </span>
                {offer?.host.isPro ?
                  <span className="property__user-status">
                    Pro
                  </span> : ''}
              </div>
              <div className="property__description">
                {offer?.description}
              </div>
            </div>
            <section className="property__reviews reviews">
              <h2 className="reviews__title">Reviews &middot;
                <span className="reviews__amount"> {comments.length}
                </span>
              </h2>

              <ListReview reviews={comments} />

              {authorizationStatus === AuthorizationStatus.Auth && <FeedbackForm cityId={numberId}/>}
            </section>
          </div>
        </div>
        {nearby.length && <Map coordinates={coordinates} selectedPoint={selectedPoint} />}
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          {nearby.length && <OfferList onListItemHover={onListItemHover} offerList={nearby} isRoom={false} />}
        </section>
      </div>
    </main>
  );
}

export default Room;
