import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {makeFakeOffer} from '../../utils/mocks';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import {AuthorizationStatus} from '../../const';
import HistoryRouter from '../../components/history-route/history-route';
import Property from './property';

const mockStore = configureMockStore();
const fakeOffer = makeFakeOffer();
const store = mockStore({
  USER: {authorizationStatus: AuthorizationStatus.Auth},
  DATA: {currentOffer: fakeOffer, comments: []},
});

describe('Component: Property', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Property />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Meet the host/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${fakeOffer.rating}`, 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${fakeOffer.bedrooms} Bedrooms`, 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`Max ${fakeOffer.maxAdults} adults`, 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${fakeOffer.price}`, 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${fakeOffer.host.name}`, 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${fakeOffer.description}`, 'i'))).toBeInTheDocument();
  });
});

