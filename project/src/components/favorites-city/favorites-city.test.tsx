import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {makeFakeOffer} from '../../utils/mocks';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import HistoryRouter from '../../components/history-route/history-route';
import FavoritesCity from './favorites-city';

const mockStore = configureMockStore();
const fakeOffer = makeFakeOffer();
const store = mockStore({DATA: {favorites: [fakeOffer]}});

describe('Component: FavoritesCity', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FavoritesCity cityName={fakeOffer.city.name} />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(new RegExp(`${fakeOffer.city.name}`, 'i'))).toBeInTheDocument();
  });
});

