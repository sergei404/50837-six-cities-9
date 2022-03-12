import {ReviewsOffer} from '../../types/reviewType';

function Review(props: ReviewsOffer): JSX.Element {
  // eslint-disable-next-line no-console
  console.log(props);

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={props.avatar}
            width="54"
            height="54"
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name">{props.name}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: `${props.grade}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {props.description}
        </p>
        <time className="reviews__time" dateTime={props.date}>
          {props.date}
        </time>
      </div>
    </li>
  );
}

export default Review;
