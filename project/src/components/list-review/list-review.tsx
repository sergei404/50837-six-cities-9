import Review from '../review/review';
import {reviewsType} from '../../types/reviewType';

type ListReviewProps = {
  reviews: reviewsType[] | undefined
};

function ListReview({reviews} : ListReviewProps): JSX.Element {

  return (
    <ul className="reviews__list">
      {reviews?.slice(0, 10).slice(0, 10).sort((prev, next) => new Date(next.date).getTime() - new Date(prev.date).getTime()).map((review) => <Review key={review.id} {...review}/>)}
    </ul>
  );
}

export default ListReview;
