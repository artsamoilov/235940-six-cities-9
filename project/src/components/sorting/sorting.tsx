import React, {memo, SyntheticEvent, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {changeSorting} from '../../store/view-process/view-process';
import {SortingOption} from '../../const';
import {getSortingType} from '../../store/view-process/selectors';
import SortingItem from '../sorting-item/sorting-item';

function Sorting(): JSX.Element {
  const [isOpened, setIsOpened] = useState(false);
  const dispatch = useAppDispatch();

  const sortingType = useAppSelector(getSortingType);

  const onSortingChange = (event: SyntheticEvent) => dispatch(changeSorting(event.currentTarget.textContent));

  const handleSortingClick = () => setIsOpened(!isOpened);

  return (
    <form className='places__sorting' action='#' method='get' onClick={handleSortingClick}>
      <span className='places__sorting-caption'>Sort by</span>
      <span className='places__sorting-type' tabIndex={0}>
        &nbsp;{sortingType}
        <svg className='places__sorting-arrow' width='7' height='4'>
          <use xlinkHref='#icon-arrow-select' />
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isOpened ? 'places__options--opened' : ''}`}>
        <SortingItem sortingType={SortingOption.Popular} onSortingChange={onSortingChange} />
        <SortingItem sortingType={SortingOption.PriceLowToHigh} onSortingChange={onSortingChange} />
        <SortingItem sortingType={SortingOption.PriceHighToLow} onSortingChange={onSortingChange} />
        <SortingItem sortingType={SortingOption.TopRatedFirst} onSortingChange={onSortingChange} />
      </ul>
    </form>
  );
}

export default memo(Sorting);
