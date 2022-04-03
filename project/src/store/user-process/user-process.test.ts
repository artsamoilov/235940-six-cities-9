import {userProcess, requireAuthorization} from './user-process';
import {AuthorizationStatus} from '../../const';

describe('Reducer: userProcess', () => {
  it('should return initial state without parameters', () => {
    expect(userProcess.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({authorizationStatus: AuthorizationStatus.Unknown});
  });

  it('should set authorizationStatus to "AUTH"', () => {
    const state = {authorizationStatus: AuthorizationStatus.Unknown};
    expect(userProcess.reducer(state, requireAuthorization(AuthorizationStatus.Auth)))
      .toEqual({authorizationStatus: AuthorizationStatus.Auth});
  });

  it('should set authorizationStatus to "NO_AUTH"', () => {
    const state = {authorizationStatus: AuthorizationStatus.Unknown};
    expect(userProcess.reducer(state, requireAuthorization(AuthorizationStatus.NoAuth)))
      .toEqual({authorizationStatus: AuthorizationStatus.NoAuth});
  });
});
