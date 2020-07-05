import { fromJS } from 'immutable';
import adminSeatInfoReducer from '../reducer';

describe('adminSeatInfoReducer', () => {
  it('returns the initial state', () => {
    expect(adminSeatInfoReducer(undefined, {})).toEqual(fromJS({}));
  });
});
