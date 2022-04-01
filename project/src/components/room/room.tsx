import FeedbackForm from '../feedback-form/feedback-form';
import { useParams } from 'react-router-dom';
//import { offerType } from '../../types/offerType';
import Map from '../map/map';
import OfferList from '../offer-list/offer-list';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
//import { useSelector, useDispatch } from 'react-redux';
import { initialStateType } from '../../store/reducer';
import { offerFetchAction } from '../../store/api-action';
import { AuthorizationStatus } from '../../const';
import ListReview from '../list-review/list-review';
import { store } from '../../store';

// type RoomProps = {
//   offerList: offerType[]
// };

//function Room({ offerList }: RoomProps): JSX.Element {
function Room(): JSX.Element {
  const [selectedPoint, setSelectedPoint] = useState<number | null>(null);

  const onListItemHover = (listItem: number | null) => {
    setSelectedPoint(listItem);
  };

  const { id } = useParams();
  const numberId = Number(id);
  //const dispatch = useDispatch();

  const authorizationStatus = useSelector((state: initialStateType) => state.authorizationStatus);
  const offer = useSelector((state: initialStateType) => state.offer);
  const comments = useSelector((state: initialStateType) => state.comments);

  //const offersListOfRoom = useSelector((state: initialStateType) => state.nearby);

  useEffect(() => {
    store.dispatch(offerFetchAction(numberId));
    //dispatch(offerFetchAction(Number(id)));
  }, [numberId]);
  //}, [store, id]);

  const offersListOfRoom = useSelector((state: initialStateType) => state.offersOfCity).slice(0, 3);


  const coordinates = offersListOfRoom.map((item) => ({
    location: item.location,
    id: item.id,
  }));

  return (
    <main className="page__main page__main--property">
      <section className="property">
        <div className="property__gallery-container container">
          <div className="property__gallery">
            {offer?.images.map((image) => (
              <div key={image} className="property__image-wrapper">
                <img className="property__image" src={image} alt="Photo_studio" />
              </div>
            ))}

            {/* <div className="property__image-wrapper">
              <img className="property__image" src="img/apartment-01.jpg" alt="Photo_studio" />
            </div>
            <div className="property__image-wrapper">
              <img className="property__image" src="img/apartment-02.jpg" alt="Photo_studio" />
            </div>
            <div className="property__image-wrapper">
              <img className="property__image" src="img/apartment-03.jpg" alt="Photo_studio" />
            </div>
            <div className="property__image-wrapper">
              <img className="property__image" src="img/studio-01.jpg" alt="Photo_studio" />
            </div>
            <div className="property__image-wrapper">
              <img className="property__image" src="img/apartment-01.jpg" alt="Photo_studio" />
            </div> */}
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
              {offer?.isFavorite ?
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
              {/* <button className="property__bookmark-button button" type="button">
                <svg className="property__bookmark-icon" width="31" height="33">
                  <use xlinkHref="#icon-bookmark"></use>
                </svg>
                <span className="visually-hidden">To bookmarks</span>
              </button> */}
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
                {/* <li className="property__inside-item">
                  Wi-Fi
                </li>
                <li className="property__inside-item">
                  Washing machine
                </li>
                <li className="property__inside-item">
                  Towels
                </li>
                <li className="property__inside-item">
                  Heating
                </li>
                <li className="property__inside-item">
                  Coffee machine
                </li>
                <li className="property__inside-item">
                  Baby seat
                </li>
                <li className="property__inside-item">
                  Kitchen
                </li>
                <li className="property__inside-item">
                  Dishwasher
                </li>
                <li className="property__inside-item">
                  Cabel TV
                </li>
                <li className="property__inside-item">
                  Fridge
                </li> */}
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
                {/* <p className="property__text">
                  A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.
                </p>
                <p className="property__text">
                  An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.
                </p> */}
              </div>
            </div>
            <section className="property__reviews reviews">
              {/* <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{review?.reviews.length}</span></h2> */}
              <h2 className="reviews__title">Reviews &middot;
                <span className="reviews__amount"> {comments.length}
                </span>
              </h2>

              <ListReview reviews={comments} />

              {authorizationStatus === AuthorizationStatus.Auth && <FeedbackForm cityId={numberId}/>}
            </section>
          </div>
        </div>
        <Map coordinates={coordinates} selectedPoint={selectedPoint} />
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <OfferList onListItemHover={onListItemHover} offerList={offersListOfRoom} isRoom={false} />
        </section>
      </div>
    </main>
  );
}

export default Room;
