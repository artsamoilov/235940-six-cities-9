import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {makeFakeCommentsList, makeFakeOffersList, makeFakeUserData} from '../../utils/mocks';
import {AuthorizationStatus, CityName, SortingOption} from '../../const';
import HistoryRouter from '../../components/history-route/history-route';
import App from '../../components/app/app';

const mockStore = configureMockStore();

const fakeOffers = makeFakeOffersList();
const fakeUserData = makeFakeUserData();
const fakeComments = makeFakeCommentsList();

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

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);

describe('Component: PropertyPage', () => {
  beforeEach(() => {
    history.push(`/offer/${fakeOffers[0].id}`);
  });

  it('should render correctly', () => {
    render(fakeApp);

    expect(screen.getByText(/Other places in the neighbourhood/i)).toBeInTheDocument();
  });
});
