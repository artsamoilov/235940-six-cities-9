import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import {SortingOption} from '../../const';
import HistoryRouter from '../../components/history-route/history-route';
import Sorting from './sorting';

const mockStore = configureMockStore();
const store = mockStore({VIEW: {sortingType: SortingOption.Popular}});

describe('Component: Sorting', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Sorting />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Sort by/i)).toBeInTheDocument();
  });
});
