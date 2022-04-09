import {CommentType} from '../../types/comment-type';
import {useAppSelector} from '../../hooks';
import {memo} from 'react';
import {getComments} from '../../store/offers-data/selectors';
import Review from '../review/review';

enum CommentsLimit {
  Minimum = 0,
  Maximum = 10,
}

function ReviewsList(): JSX.Element {
  const comments = useAppSelector(getComments);

  const sortCommentsNewFirst = (comment1: CommentType, comment2: CommentType) => {
    const date1InNumber = new Date(comment1.date).getTime();
    const date2InNumber = new Date(comment2.date).getTime();
    return date2InNumber - date1InNumber;
  };

  const sortedComments = comments.slice().sort((comment1, comment2) => sortCommentsNewFirst(comment1, comment2));

  const displayedComments = sortedComments.slice(CommentsLimit.Minimum, CommentsLimit.Maximum);

  return (
    <>
      <h2 className='reviews__title'>
        Reviews &middot; <span className='reviews__amount'>{comments.length}</span>
      </h2>
      <ul className='reviews__list'>
        {displayedComments.map((comment: CommentType) => <Review key={comment.id} {...comment}/>)}
      </ul>
    </>
  );
}

export default memo(ReviewsList);
