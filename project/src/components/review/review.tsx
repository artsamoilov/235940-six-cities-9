import dayjs from 'dayjs';
import {getRatingPercent} from '../../common';
import {CommentType} from '../../types/comment-type';

const DATE_FORMAT = 'MMMM YYYY';

export default function Review({comment, date, rating, user}: CommentType): JSX.Element {
  return (
    <li className='reviews__item'>
      <div className='reviews__user user'>
        <div className='reviews__avatar-wrapper user__avatar-wrapper'>
          <img className='reviews__avatar user__avatar' src={user.avatarUrl} width='54' height='54' alt='Reviews avatar' />
        </div>
        <span className='reviews__user-name'>{user.name}</span>
      </div>
      <div className='reviews__info'>
        <div className='reviews__rating rating'>
          <div className='reviews__stars rating__stars'>
            <span style={{width: `${getRatingPercent(rating)}%`}} />
            <span className='visually-hidden'>Rating</span>
          </div>
        </div>
        <p className='reviews__text'>{comment}</p>
        <time className='reviews__time' dateTime={dayjs(date).toISOString()}>{dayjs(date).format(DATE_FORMAT)}</time>
      </div>
    </li>
  );
}
