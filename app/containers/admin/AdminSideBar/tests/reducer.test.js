import { fromJS } from 'immutable';
import adminSideBarReducer from '../reducer';

describe('adminSideBarReducer', () => {
  it('returns the initial state', () => {
    expect(adminSideBarReducer(undefined, {})).toEqual(fromJS({}));
  });
});
