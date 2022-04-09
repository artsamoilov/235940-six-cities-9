import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createAPI} from '../services/api';
import {requireAuthorization} from './user-process/user-process';
import {APIRoute} from '../const';
import {State} from '../types/state';
import {AuthData} from '../types/auth-data';
import {makeFakeOffersList, makeFakeOffer, makeFakeCommentsList} from '../utils/mocks';
import {
  changeFavorite,
  loadComments,
  loadCurrentOffer,
  loadFavorites,
  loadNearbyOffers,
  loadOffers, setFavoritesLoadingNeeded
} from './offers-data/offers-data';
import {
  checkAuthAction,
  loginAction,
  logoutAction,
  fetchOffersAction,
  fetchCurrentOfferAction,
  fetchNearbyOffersAction,
  fetchCommentsAction, postCommentAction, fetchFavoritesAction, setFavoriteAction, removeFromFavoritesAction
} from './api-actions';

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
      State,
      Action,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  it('should set "AUTH" authorization status when server returns 200', async () => {
    const store = mockStore();
    mockAPI.onGet(APIRoute.Login).reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuthAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(requireAuthorization.toString());
  });

  it('should dispatch requireAuthorization and redirectToRoute when POST /login', async () => {
    const fakeUser: AuthData = {email: 'test@test.com', password: '123qwe'};

    mockAPI.onPost(APIRoute.Login).reply(200, {token: 'secret'});

    const store = mockStore();
    Storage.prototype.setItem = jest.fn();

    await store.dispatch(loginAction(fakeUser));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(requireAuthorization.toString());
    expect(Storage.prototype.setItem).toBeCalledTimes(1);
    expect(Storage.prototype.setItem).toBeCalledWith('X-Token', 'secret');
  });

  it('should dispatch loadOffers when GET /hotels', async () => {
    const fakeOffers = makeFakeOffersList();

    mockAPI.onGet(APIRoute.Offers).reply(200, fakeOffers);

    const store = mockStore();

    await store.dispatch(fetchOffersAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(loadOffers.toString());
  });

  it('should dispatch Logout when DELETE /logout', async () => {
    mockAPI.onDelete(APIRoute.Logout).reply(204);

    const store = mockStore();
    Storage.prototype.removeItem = jest.fn();

    await store.dispatch(logoutAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(requireAuthorization.toString());

    expect(Storage.prototype.removeItem).toBeCalledTimes(1);
    expect(Storage.prototype.removeItem).toBeCalledWith('X-Token');
  });

  it('should dispatch loadCurrentOffer when GET /hotels/:id', async () => {
    const fakeOffer = makeFakeOffer();
    const ID = '1';

    mockAPI.onGet(`${APIRoute.Offers}/${ID}`).reply(200, fakeOffer);

    const store = mockStore();

    await store.dispatch(fetchCurrentOfferAction(ID));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(loadCurrentOffer.toString());
  });

  it('should dispatch loadNearbyOffers when GET /hotels/:id/nearby', async () => {
    const fakeOffers = makeFakeOffersList();
    const ID = '1';

    mockAPI.onGet(`${APIRoute.Offers}/${ID}/nearby`).reply(200, fakeOffers);

    const store = mockStore();

    await store.dispatch(fetchNearbyOffersAction(ID));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(loadNearbyOffers.toString());
  });

  it('should dispatch loadComments when GET /comments/:id', async () => {
    const fakeComments = makeFakeCommentsList();
    const ID = '1';

    mockAPI.onGet(`${APIRoute.Comments}/${ID}`).reply(200, fakeComments);

    const store = mockStore();

    await store.dispatch(fetchCommentsAction(ID));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(loadComments.toString());
  });

  it('should dispatch loadComments when POST /comments/:id', async () => {
    const fakeComment = {offerId: '1', rating: 1, comment: 'test'};

    mockAPI.onPost(`${APIRoute.Comments}/${fakeComment.offerId}`).reply(200, {token: 'secret'});

    const store = mockStore();

    await store.dispatch(postCommentAction(fakeComment));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(loadComments.toString());
  });

  it('should dispatch loadFavorites when GET /favorite', async () => {
    const fakeOffers = makeFakeOffersList();

    mockAPI.onGet(APIRoute.Favorite).reply(200, fakeOffers);

    const store = mockStore();

    await store.dispatch(fetchFavoritesAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(loadFavorites.toString());
  });

  it('should dispatch changeFavorite and setFavoritesLoadingNeeded when POST /favorite/:id/:status', async () => {
    const fakeData = {offerId: 1, status: 1};

    mockAPI.onPost(`${APIRoute.Favorite}/${fakeData.offerId}/${fakeData.status}`)
      .reply(200, {token: 'secret'});

    const store = mockStore();

    await store.dispatch(setFavoriteAction(fakeData));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(changeFavorite.toString());
    expect(actions).toContain(setFavoritesLoadingNeeded.toString());
  });

  it('should dispatch changeFavorite when POST /favorite/:id/:status', async () => {
    const fakeData = {offerId: 1, status: 0};

    mockAPI.onPost(`${APIRoute.Favorite}/${fakeData.offerId}/${fakeData.status}`)
      .reply(200, {token: 'secret'});

    const store = mockStore();

    await store.dispatch(removeFromFavoritesAction(String(fakeData.offerId)));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(changeFavorite.toString());
  });
});
