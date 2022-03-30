import React, {memo, SyntheticEvent, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {changeSorting} from '../../store/view-process/view-process';
import {SortingOption} from '../../const';
import SortingItem from '../sorting-item/sorting-item';

function Sorting(): JSX.Element {
  const [isOpened, setIsOpened] = useState(false);
  const dispatch = useAppDispatch();
  const sortingType = useAppSelector(({VIEW}) => VIEW.sortingType);

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
        <SortingItem sortingType={SortingOption.Popular} sortingChangeHandler={sortingChangeHandler} />
        <SortingItem sortingType={SortingOption.PriceLowToHigh} sortingChangeHandler={sortingChangeHandler} />
        <SortingItem sortingType={SortingOption.PriceHighToLow} sortingChangeHandler={sortingChangeHandler} />
        <SortingItem sortingType={SortingOption.TopRatedFirst} sortingChangeHandler={sortingChangeHandler} />
      </ul>
    </form>
  );
}

export default memo(Sorting);
