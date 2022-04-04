import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import {SortingOption} from '../../const';
import HistoryRouter from '../../components/history-route/history-route';
import SortingItem from './sorting-item';

const mockStore = configureMockStore();
const store = mockStore({VIEW: {sortingType: SortingOption.Popular}});

describe('Component: SortingItem', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <SortingItem sortingType={SortingOption.Popular} sortingChangeHandler={() => {}} />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(new RegExp(`${SortingOption.Popular}`, 'i'))).toBeInTheDocument();
  });
});
