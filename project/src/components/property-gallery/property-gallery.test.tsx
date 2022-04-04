import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import HistoryRouter from '../../components/history-route/history-route';
import PropertyGallery from './property-gallery';

const mockStore = configureMockStore();
const store = mockStore();

describe('Component: PropertyGallery', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <PropertyGallery images={['/img/photo.jpg']} />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByAltText(/Property/i)).toBeInTheDocument();
  });
});

