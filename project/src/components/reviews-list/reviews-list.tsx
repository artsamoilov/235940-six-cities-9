import {CommentType} from '../../types/comment-type';
import {useAppSelector} from '../../hooks';
import {memo} from 'react';
import Review from '../review/review';

function ReviewsList(): JSX.Element {
  const comments = useAppSelector(({DATA}) => DATA.comments);
  return (
    <>
      <h2 className='reviews__title'>Reviews &middot; <span className='reviews__amount'>{comments.length}</span></h2>
      <ul className='reviews__list'>
        {comments.map((comment: CommentType) => <Review key={comment.id} {...comment}/>)}
      </ul>
    </>
  );
}

export default memo(ReviewsList);
