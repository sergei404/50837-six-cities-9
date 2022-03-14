import Review from '../review/review';
import {ReviewsOffer} from '../../types/reviewType';

type ListReviewProps = {
  reviews: ReviewsOffer[] | undefined
};

function ListReview({reviews} : ListReviewProps): JSX.Element {
  return (
    <ul className="reviews__list">
      {reviews?.map((review) => <Review key={review.id} {...review}/>)}
    </ul>
  );
}

export default ListReview;
