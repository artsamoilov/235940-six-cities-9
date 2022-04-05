import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {makeFakeCommentsList, makeFakeOffersList, makeFakeUserData} from '../../utils/mocks';
import {AppRoute, AuthorizationStatus, CityName, SortingOption} from '../../const';
import HistoryRouter from '../../components/history-route/history-route';
import App from '../../components/app/app';

const mockStore = configureMockStore();

const fakeOffers = makeFakeOffersList();
const fakeUserData = makeFakeUserData();
const fakeComments = makeFakeCommentsList();

const history = createMemoryHistory();

describe('Component: FavoritesPage', () => {
  beforeEach(() => {
    history.push(AppRoute.Favorites);
  });

  it('should render correctly when favorites exist', () => {
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.Auth},
      VIEW: {cityName: CityName.Paris, sortingType: SortingOption.Popular},
      DATA: {
        isDataLoaded: true,
        offers: fakeOffers,
        userData: fakeUserData,
        currentOffer: fakeOffers[0],
        nearbyOffers: fakeOffers,
        comments: fakeComments,
        isFavoritesLoaded: true,
        isFavoritesUpdated: true,
        favorites: fakeOffers,
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <App />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Saved listing/i)).toBeInTheDocument();
    expect(screen.queryByText(/Nothing yet saved./i)).not.toBeInTheDocument();
  });

  it('should render correctly when favorites not exist', () => {
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.Auth},
      VIEW: {cityName: CityName.Paris, sortingType: SortingOption.Popular},
      DATA: {
        isDataLoaded: true,
        offers: fakeOffers,
        userData: fakeUserData,
        currentOffer: fakeOffers[0],
        nearbyOffers: fakeOffers,
        comments: fakeComments,
        isFavoritesLoaded: true,
        isFavoritesUpdated: true,
        favorites: [],
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <App />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.queryByText(/Saved listing/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Nothing yet saved./i)).toBeInTheDocument();
  });
});
