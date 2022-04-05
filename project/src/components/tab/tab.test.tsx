import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import {CityName} from '../../const';
import HistoryRouter from '../../components/history-route/history-route';
import Tab from './tab';

const mockStore = configureMockStore();
const store = mockStore({VIEW: {cityName: CityName.Paris}});

describe('Component: Tab', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Tab cityName={CityName.Amsterdam} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(new RegExp(`${CityName.Amsterdam}`, 'i'))).toBeInTheDocument();
  });
});
