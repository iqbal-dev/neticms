import { fromJS } from 'immutable';
import adminDressInfoReducer from '../reducer';

describe('adminDressInfoReducer', () => {
  it('returns the initial state', () => {
    expect(adminDressInfoReducer(undefined, {})).toEqual(fromJS({}));
  });
});
