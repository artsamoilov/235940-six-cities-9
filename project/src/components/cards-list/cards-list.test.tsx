import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {makeFakeOffer} from '../../utils/mocks';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import {AuthorizationStatus, CityName, SortingOption} from '../../const';
import HistoryRouter from '../../components/history-route/history-route';
import CardsList from './cards-list';

const mockStore = configureMockStore();
const fakeOffer = makeFakeOffer();
const store = mockStore({
  VIEW: {cityName: fakeOffer.city.name, sortingType: SortingOption.Popular},
  USER: {authorizationStatus: AuthorizationStatus.Auth},
});

describe('Component: CardsList', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CardsList handleCardHover={() => {}} offers={[fakeOffer]}/>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(fakeOffer.title)).toBeInTheDocument();
    expect(screen.getByText(`${fakeOffer.type[0].toUpperCase() + fakeOffer.type.slice(1)}`)).toBeInTheDocument();
  });
});

