import {FormEvent, memo, useState} from 'react';
import {postCommentAction} from '../../store/api-actions';
import {store} from '../../store';
import {useParams} from 'react-router-dom';
import {useAppSelector} from '../../hooks';

type PropsType = {
  target: {
    name: string,
    value: string,
  }
}

const enum TextLimit {
  Minimum = 50,
  Maximum = 300,
}

function CommentForm(): JSX.Element {
  const isCommentSent = useAppSelector(({DATA}) => DATA.isCommentSent);
  const offerId = useParams().id;
  const [formData, setFormData] = useState({
    rating: '',
    review: '',
  });

  const handleFieldChange = (evt: PropsType) => {
    const {name, value} = evt.target;
    setFormData({...formData, [name]: value});
  };

  const isButtonDisabled = (): boolean => !formData.rating || formData.review.length < TextLimit.Minimum || formData.review.length > TextLimit.Maximum;

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>): void => {
    evt.preventDefault();
    evt.currentTarget.reset();
    store.dispatch(postCommentAction({offerId: offerId, rating: Number(formData.rating), comment: formData.review}));
    setFormData({rating: '', review: ''});
  };

  return (
    <fieldset style={{border: 'none', padding: '0', margin: '0'}} disabled={!isCommentSent}>
      <form onSubmit={handleFormSubmit} className='reviews__form form' action='' method='post'>
        <label className='reviews__label form__label' htmlFor='review'>Your review</label>
        <div className='reviews__rating-form form__rating'>
          <input onChange={handleFieldChange} className='form__rating-input visually-hidden' name='rating' value='5' id='5-stars' type='radio' />
          <label htmlFor='5-stars' className='reviews__rating-label form__rating-label' title='perfect'>
            <svg className='form__star-image' width='37' height='33'>
              <use xlinkHref='#icon-star' />
            </svg>
          </label>

          <input onChange={handleFieldChange} className='form__rating-input visually-hidden' name='rating' value='4' id='4-stars' type='radio' />
          <label htmlFor='4-stars' className='reviews__rating-label form__rating-label' title='good'>
            <svg className='form__star-image' width='37' height='33'>
              <use xlinkHref='#icon-star' />
            </svg>
          </label>

          <input onChange={handleFieldChange} className='form__rating-input visually-hidden' name='rating' value='3' id='3-stars' type='radio' />
          <label htmlFor='3-stars' className='reviews__rating-label form__rating-label'  title='not bad'>
            <svg className='form__star-image' width='37' height='33'>
              <use xlinkHref='#icon-star' />
            </svg>
          </label>

          <input onChange={handleFieldChange} className='form__rating-input visually-hidden' name='rating' value='2' id='2-stars' type='radio' />
          <label htmlFor='2-stars' className='reviews__rating-label form__rating-label' title='badly'>
            <svg className='form__star-image' width='37' height='33'>
              <use xlinkHref='#icon-star' />
            </svg>
          </label>

          <input onChange={handleFieldChange} className='form__rating-input visually-hidden' name='rating' value='1' id='1-star' type='radio' />
          <label htmlFor='1-star' className='reviews__rating-label form__rating-label' title='terribly'>
            <svg className='form__star-image' width='37' height='33'>
              <use xlinkHref='#icon-star' />
            </svg>
          </label>
        </div>
        <textarea onChange={handleFieldChange} value={formData.review} className='reviews__textarea form__textarea' id='review' name='review' placeholder='Tell how was your stay, what you like and what can be improved' />
        <div className='reviews__button-wrapper'>
          <p className='reviews__help'>
            To submit review please make sure to set <span className='reviews__star'>rating</span>
            and describe your stay with at least <b className='reviews__text-amount'>50 characters</b>.
          </p>
          <button className='reviews__submit form__submit button' type='submit' disabled={isButtonDisabled()}>Submit</button>
        </div>
      </form>
    </fieldset>
  );
}

export default memo(CommentForm);
