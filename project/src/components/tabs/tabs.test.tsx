import {render, screen} from '@testing-library/react';
import {CityName} from '../../const';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import Tabs from './tabs';
import HistoryRouter from '../history-route/history-route';

const mockStore = configureMockStore();
const store = mockStore({VIEW: {cityName: CityName.Paris}});

describe('Component: Tabs', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Tabs />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(new RegExp(`${CityName.Amsterdam}`, 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${CityName.Brussels}`, 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${CityName.Cologne}`, 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${CityName.Dusseldorf}`, 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${CityName.Hamburg}`, 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${CityName.Paris}`, 'i'))).toBeInTheDocument();
  });
});
