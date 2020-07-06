import { fromJS } from 'immutable';
import adminHeaderReducer from '../reducer';

describe('adminHeaderReducer', () => {
  it('returns the initial state', () => {
    expect(adminHeaderReducer(undefined, {})).toEqual(fromJS({}));
  });
});
