import {CommentType} from '../../types/comment-type';
import {useAppSelector} from '../../hooks';
import Review from '../review/review';

export default function ReviewsList(): JSX.Element {
  const comments = useAppSelector((state) => state.comments);
  return (
    <>
      <h2 className='reviews__title'>Reviews &middot; <span className='reviews__amount'>{comments.length}</span></h2>
      <ul className='reviews__list'>
        {comments.map((comment: CommentType) => <Review key={comment.id} {...comment}/>)}
      </ul>
    </>
  );
}
