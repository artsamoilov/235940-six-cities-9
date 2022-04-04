import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {makeFakeOffer} from '../../utils/mocks';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import {AuthorizationStatus, SortingOption} from '../../const';
import HistoryRouter from '../../components/history-route/history-route';
import Cities from './cities';

const mockStore = configureMockStore();
const fakeOffer = makeFakeOffer();
const store = mockStore({
  VIEW: {cityName: fakeOffer.city.name, sortingType: SortingOption.Popular},
  USER: {authorizationStatus: AuthorizationStatus.Auth},
  DATA: {offers: [fakeOffer]},
});

describe('Component: Cities', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Cities />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/places to stay/i)).toBeInTheDocument();
  });
});

