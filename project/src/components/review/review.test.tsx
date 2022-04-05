import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {makeFakeComment} from '../../utils/mocks';
import HistoryRouter from '../../components/history-route/history-route';
import Review from './review';

const fakeComment = makeFakeComment();

describe('Component: Review', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <Review {...fakeComment} />
      </HistoryRouter>,
    );

    expect(screen.getByText(new RegExp(`${fakeComment.user.name}`, 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${fakeComment.comment}`, 'i'))).toBeInTheDocument();
    expect(screen.getByAltText(/Reviews avatar/i)).toBeInTheDocument();
  });
});
