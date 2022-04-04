import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import PropertyImage from './property-image';

describe('Component: PropertyImage', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <PropertyImage source={'/img/photo.jpg'} />
      </HistoryRouter>
    );

    expect(screen.getByAltText(/Property/i)).toBeInTheDocument();
  });
});

