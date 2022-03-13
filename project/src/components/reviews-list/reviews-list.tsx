import {Reviews} from "../../mocks/reviews";
import {ReviewType} from "../../types/review-type";
import Review from "../review/review";

export default function ReviewsList() {
  return (
    <>
      <h2 className='reviews__title'>Reviews &middot; <span className='reviews__amount'>{Reviews.length}</span></h2>
      <ul className='reviews__list'>
        {Reviews.map((review: ReviewType, index: number) => <Review key={review.id} {...Reviews[index]}/>)}
      </ul>
    </>
  );
}
