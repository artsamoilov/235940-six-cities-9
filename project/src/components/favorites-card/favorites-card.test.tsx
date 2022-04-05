import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {makeFakeOffer} from '../../utils/mocks';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import HistoryRouter from '../../components/history-route/history-route';
import FavoritesCard from './favorites-card';

const mockStore = configureMockStore();
const store = mockStore();
const fakeOffer = makeFakeOffer();

describe('Component: FavoritesCard', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FavoritesCard offer={fakeOffer}/>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(new RegExp(`${fakeOffer.price}`, 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${fakeOffer.title}`, 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${fakeOffer.type[0].toUpperCase() + fakeOffer.type.slice(1)}`, 'i'))).toBeInTheDocument();
  });
});

