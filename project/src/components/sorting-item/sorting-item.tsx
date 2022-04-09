import {SyntheticEvent} from 'react';
import {useAppSelector} from '../../hooks';
import {getSortingType} from '../../store/view-process/selectors';

type PropsType = {
  sortingType: string,
  onSortingChange: (evt: SyntheticEvent) => void,
}

export default function SortingItem({sortingType, onSortingChange}: PropsType): JSX.Element {
  const storedSortingType = useAppSelector(getSortingType);

  const handleSortingItemClick = (evt: SyntheticEvent) => onSortingChange(evt);

  return (
    <li className={`places__option ${storedSortingType === sortingType ? 'places__option--active' : ''}`}
      tabIndex={0}
      onClick={handleSortingItemClick}
    >
      {sortingType}
    </li>
  );
}
