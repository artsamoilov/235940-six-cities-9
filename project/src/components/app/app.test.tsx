import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {AuthorizationStatus, AppRoute, CityName, SortingOption} from '../../const';
import {makeFakeCommentsList, makeFakeOffersList, makeFakeUserData} from '../../utils/mocks';
import HistoryRouter from '../history-route/history-route';
import App from './app';

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

describe('Application Routing', () => {
  it('should render "MainPage" when user navigate to "/"', () => {
    history.push(AppRoute.Main);

    render(fakeApp);

    expect(screen.getByText(/Cities/i)).toBeInTheDocument();
    expect(screen.getByText(/Brussels/i)).toBeInTheDocument();
    expect(screen.getByText(/Cologne/i)).toBeInTheDocument();
    expect(screen.getByText(/Amsterdam/i)).toBeInTheDocument();
    expect(screen.getByText(/Hamburg/i)).toBeInTheDocument();
    expect(screen.getByText(/Dusseldorf/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${fakeUserData.email}`, 'i'))).toBeInTheDocument();
  });

  it('should render "LoginPage" when user navigate to "/login"', () => {
    history.push(AppRoute.SignIn);

    render(fakeApp);

    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
  });

  it('should render "PropertyPage" when user navigate to "/offer/:id"', () => {
    history.push(`/offer/${fakeOffers[0].id}`);

    render(fakeApp);

    expect(screen.getByText(/What's inside/i)).toBeInTheDocument();
    expect(screen.getByText(/Meet the host/i)).toBeInTheDocument();
    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
    expect(screen.getByText(/Other places in the neighbourhood/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${fakeUserData.email}`, 'i'))).toBeInTheDocument();
  });

  it('should render "FavoritesPage" when user navigate to "/favorite"', () => {
    history.push(AppRoute.Favorites);

    render(fakeApp);

    expect(screen.getByText(/Saved listing/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${fakeUserData.email}`, 'i'))).toBeInTheDocument();
  });

  it('should render "NotFoundPage" when user navigate to non-existent route', () => {
    history.push('/non-existent');

    render(fakeApp);

    expect(screen.getByText(/404 Not Found/i)).toBeInTheDocument();
    expect(screen.getByText(/Return to main page/i)).toBeInTheDocument();
  });
});
