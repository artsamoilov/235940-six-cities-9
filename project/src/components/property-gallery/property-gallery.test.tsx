import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import PropertyGallery from './property-gallery';

describe('Component: PropertyGallery', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <PropertyGallery images={['/img/photo.jpg']} />
      </HistoryRouter>,
    );

    expect(screen.getByAltText(/Property/i)).toBeInTheDocument();
  });
});
