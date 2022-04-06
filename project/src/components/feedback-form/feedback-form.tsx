import { FormEvent, SyntheticEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addReviewAction } from '../../store/api-action';
import { ReviewData } from '../../types/review-data';

type FeedbackFormProps = {
  cityId: number
}

function FeedbackForm({cityId}: FeedbackFormProps): JSX.Element {
  const [formData, setFormData] = useState({
    '5-stars': '5',
    '4-stars': '4',
    '3-stars': '3',
    '2-stars': '2',
    '1-stars': '1',
    rating: '',
    review: '',
  });

  const dispatch =  useDispatch();


  function fieldChangeHandle(evt: SyntheticEvent & { target: HTMLInputElement | HTMLTextAreaElement}): void {
    const { name, value } = evt.target;

    setFormData({ ...formData, [name]: value });
  }

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (formData.rating !== '' && formData.review !== '') {
      const {rating, review} = formData;
      const reviewData: ReviewData = {
        offerId: cityId,
        reviewData: {rating, comment: review},
      };

      dispatch(addReviewAction(reviewData));

      formData.rating = '';
      formData.review = '';
    }
  };

  // useEffect(() => {
  //   if (formData.rating !== '' && formData.review !== '') {
  //     const {rating, review} = formData;
  //     const reviewData: ReviewData = {
  //       offerId: cityId,
  //       reviewData: {rating, comment: review},
  //     };

  //     dispatch(addReviewAction(reviewData));

  //     formData.rating = '';
  //     formData.review = '';
  //   }
  // }, [cityId, dispatch, formData, formData.rating, formData.review]);

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        <input className="form__rating-input visually-hidden" name="rating" value={formData['5-stars']} id="5-stars" type="radio" onChange={fieldChangeHandle}/>
        <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value={formData['4-stars']} id="4-stars" type="radio" onChange={fieldChangeHandle}/>
        <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value={formData['3-stars']} id="3-stars" type="radio" onChange={fieldChangeHandle}/>
        <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value={formData['2-stars']} id="2-stars" type="radio" onChange={fieldChangeHandle}/>
        <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value={formData['1-stars']} id="1-star" type="radio" onChange={fieldChangeHandle}/>
        <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
      </div>
      <textarea className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved" value={formData.review} onChange={fieldChangeHandle}></textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit">Submit</button>
      </div>
    </form>
  );
}

export default FeedbackForm;
