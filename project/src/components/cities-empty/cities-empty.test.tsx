import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {makeFakeOffer} from '../../utils/mocks';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import HistoryRouter from '../../components/history-route/history-route';
import CitiesEmpty from './cities-empty';

const mockStore = configureMockStore();
const fakeOffer = makeFakeOffer();
const store = mockStore({VIEW: {cityName: fakeOffer.city.name}});

describe('Component: CitiesEmpty', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CitiesEmpty />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/No places to stay available/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`We could not find any property available at the moment in ${fakeOffer.city.name}`, 'i'))).toBeInTheDocument();
  });
});

