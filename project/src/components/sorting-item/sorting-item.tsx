import {SyntheticEvent} from 'react';
import {useAppSelector} from '../../hooks';

type PropsType = {
  sortingType: string,
  sortingChangeHandler: (evt: SyntheticEvent) => void,
}

export default function SortingItem({sortingType, sortingChangeHandler}: PropsType): JSX.Element {
  const storedSortingType = useAppSelector((store) => store.sortingType);

  return (
    <li className={`places__option ${storedSortingType === sortingType ? 'places__option--active' : ''}`}
      tabIndex={0}
      onClick={(evt) => sortingChangeHandler(evt)}
    >{sortingType}
    </li>
  );
}
