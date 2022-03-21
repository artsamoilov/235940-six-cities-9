import React, {SyntheticEvent, useState} from 'react';
import {useAppSelector, useAppDispatch} from '../../hooks';
import {changeSorting} from '../../store/action';

export default function Sort(): JSX.Element {
  const [isOpened, setIsOpened] = useState(false);
  const dispatch = useAppDispatch();
  const sortingType = useAppSelector((state) => state.sortingType);

  const sortingChangeHandler = (event: SyntheticEvent) => dispatch(changeSorting(event.currentTarget.textContent));

  return (
    <form className='places__sorting' action='#' method='get' onClick={() => setIsOpened(!isOpened)}>
      <span className='places__sorting-caption'>Sort by</span>
      <span className='places__sorting-type' tabIndex={0}>
        &nbsp;{sortingType}
        <svg className='places__sorting-arrow' width='7' height='4'>
          <use xlinkHref='#icon-arrow-select' />
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isOpened ? 'places__options--opened' : ''}`}>
        <li className={`places__option places__option--active`} tabIndex={0} onClick={(evt) => sortingChangeHandler(evt)}>Popular</li>
        <li className='places__option' tabIndex={0} onClick={(evt) => sortingChangeHandler(evt)}>Price: low to high</li>
        <li className='places__option' tabIndex={0} onClick={(evt) => sortingChangeHandler(evt)}>Price: high to low</li>
        <li className='places__option' tabIndex={0} onClick={(evt) => sortingChangeHandler(evt)}>Top rated first</li>
      </ul>
    </form>
  );
}
