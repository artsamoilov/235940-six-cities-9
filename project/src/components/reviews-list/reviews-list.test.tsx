import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {makeFakeComment} from '../../utils/mocks';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import HistoryRouter from '../../components/history-route/history-route';
import ReviewsList from './reviews-list';

const mockStore = configureMockStore();
const fakeComment = makeFakeComment();
const store = mockStore({DATA: {comments: [fakeComment]}});

describe('Component: ReviewsList', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ReviewsList />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(new RegExp(`${fakeComment.user.name}`, 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${fakeComment.comment}`, 'i'))).toBeInTheDocument();
    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
  });
});
