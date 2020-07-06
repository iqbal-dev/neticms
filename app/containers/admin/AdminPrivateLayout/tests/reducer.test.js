import { fromJS } from 'immutable';
import adminPrivateLayoutReducer from '../reducer';

describe('adminPrivateLayoutReducer', () => {
  it('returns the initial state', () => {
    expect(adminPrivateLayoutReducer(undefined, {})).toEqual(fromJS({}));
  });
});
