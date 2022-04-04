import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {makeFakeUserData} from '../../utils/mocks';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import {AuthorizationStatus} from '../../const';
import HistoryRouter from '../../components/history-route/history-route';
import Navigation from './navigation';

const fakeUserData = makeFakeUserData();

const mockStore = configureMockStore();

describe('Component: Navigation', () => {
  it('should render correctly when user is authorized', () => {
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.Auth},
      DATA: {userData: fakeUserData},
    });

    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Navigation />
        </HistoryRouter>
      </Provider>
  );

    expect(screen.getByText(new RegExp(`${fakeUserData.email}`, 'i'))).toBeInTheDocument();
    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
  });

  it('should render correctly when user is not authorized', () => {
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.NoAuth},
      DATA: {userData: fakeUserData},
    });

    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Navigation />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.queryByText(new RegExp(`${fakeUserData.email}`, 'i'))).not.toBeInTheDocument();
    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
  });
});

