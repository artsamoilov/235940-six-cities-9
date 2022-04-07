import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {makeFakeOffer} from '../../utils/mocks';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import {AuthorizationStatus} from '../../const';
import HistoryRouter from '../../components/history-route/history-route';
import Card from './card';

const mockStore = configureMockStore();
const store = mockStore({USER: {authorizationStatus: AuthorizationStatus.Auth}});
const fakeOffer = makeFakeOffer();

describe('Component: Card', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Card onCurrentCardHover={jest.fn()} offer={fakeOffer}/>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(new RegExp(`${fakeOffer.price}`, 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${fakeOffer.title}`, 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${fakeOffer.type[0].toUpperCase() + fakeOffer.type.slice(1)}`, 'i'))).toBeInTheDocument();
  });
});

