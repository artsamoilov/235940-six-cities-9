import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import {SortingOption} from '../../const';
import {PARIS} from '../../mocks/cities';
import HistoryRouter from '../../components/history-route/history-route';
import Tab from './tab';

const mockStore = configureMockStore();
const store = mockStore({VIEW: {cityName: PARIS.name}});

describe('Component: Tab', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Tab cityName={PARIS.name} />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(new RegExp(`${PARIS.name}`, 'i'))).toBeInTheDocument();
  });
});
