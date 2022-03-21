import React, {SyntheticEvent, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {changeSorting} from '../../store/action';
import {SortingOption} from '../../const';

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

        <li className={`places__option ${sortingType === SortingOption.Popular ? 'places__option--active' : ''}`}
            tabIndex={0}
            onClick={(evt) => sortingChangeHandler(evt)}
        >{SortingOption.Popular}</li>

        <li className={`places__option ${sortingType === SortingOption.PriceLowToHigh ? 'places__option--active' : ''}`}
            tabIndex={0}
            onClick={(evt) => sortingChangeHandler(evt)}
        >{SortingOption.PriceLowToHigh}</li>

        <li className={`places__option ${sortingType === SortingOption.PriceHighToLow ? 'places__option--active' : ''}`}
            tabIndex={0}
            onClick={(evt) => sortingChangeHandler(evt)}
        >{SortingOption.PriceHighToLow}</li>

        <li className={`places__option ${sortingType === SortingOption.TopRatedFirst ? 'places__option--active' : ''}`}
            tabIndex={0}
            onClick={(evt) => sortingChangeHandler(evt)}
        >{SortingOption.TopRatedFirst}</li>

      </ul>
    </form>
  );
}
