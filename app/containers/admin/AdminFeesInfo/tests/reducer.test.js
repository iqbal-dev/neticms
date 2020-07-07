import { fromJS } from 'immutable';
import adminFeesInfoReducer from '../reducer';

describe('adminFeesInfoReducer', () => {
  it('returns the initial state', () => {
    expect(adminFeesInfoReducer(undefined, {})).toEqual(fromJS({}));
  });
});
