import { fromJS } from 'immutable';
import appPrivateLayoutReducer from '../reducer';

describe('appPrivateLayoutReducer', () => {
  it('returns the initial state', () => {
    expect(appPrivateLayoutReducer(undefined, {})).toEqual(fromJS({}));
  });
});
