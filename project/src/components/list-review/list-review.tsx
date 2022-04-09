import Review from '../review/review';
import {reviewsType} from '../../types/reviewType';
import { REVIEW_COUNT } from '../../const';

type ListReviewProps = {
  reviews: reviewsType[] | undefined
};

function ListReview({reviews} : ListReviewProps): JSX.Element {

  return (
    <ul className="reviews__list">
      {reviews?.slice(0, REVIEW_COUNT).map((review) => <Review key={review.id} {...review}/>)}
    </ul>
  );
}

export default ListReview;
