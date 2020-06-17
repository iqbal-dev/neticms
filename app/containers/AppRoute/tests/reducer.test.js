import { fromJS } from 'immutable';
import appRouteReducer from '../reducer';

describe('appRouteReducer', () => {
  it('returns the initial state', () => {
    expect(appRouteReducer(undefined, {})).toEqual(fromJS({}));
  });
});
