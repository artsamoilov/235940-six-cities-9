import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import CommentForm from './comment-form';

describe('Component: CommentForm', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <CommentForm />
      </HistoryRouter>
    );

    expect(screen.getByText(/Your review/i)).toBeInTheDocument();
    expect(screen.getByText(/To submit review please make sure to set /i)).toBeInTheDocument();
    expect(screen.getByText(/rating/i)).toBeInTheDocument();
    expect(screen.getByText(/ and describe your stay with at least /i)).toBeInTheDocument();
    expect(screen.getByText(/50 characters/i)).toBeInTheDocument();
  });
});

